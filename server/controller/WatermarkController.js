// const watermark = require('image-watermark-2');
const HummusRecipe  = require('hummus-recipe');
const pdfparse      = require('pdf-parse');
const csv           = require('csv-parser');
const fs            = require('fs');

const { removeAccentsAndSpaces, makeId } = require('../../src/Library/Custom');

module.exports = class WatermarkController {
    static generateWaterMark(csvFile, pdfFiles) {
        return new Promise((resolve, reject) => {
            const records = [];

            fs.createReadStream(`uploads/csv/${csvFile}.csv`)
            .pipe(csv({ separator: ';' }))
            .on('data', data => {
                const array = Object.values(data);

                if(records.length < 50) {
                    if(array[0].length > 0 && array[1].length > 0 && array[2].length > 0)
                        records.push({
                            data1: array[0],
                            data2: array[1],
                            data3: array[2]
                        });
                }
            })
            .on('end', () => {
                // console.time('Convert');
                const folderId = makeId(8), outputDir = `uploads/output/${folderId}`;

                records.map(record => pdfFiles.map((pdfFile, index) => {
                    const count = index + 1;

                    const outputDirPdf = `${outputDir}/${removeAccentsAndSpaces(record.data1)}`;

                    try {
                        fs.statSync(outputDirPdf);
                    } catch(e) {
                        fs.mkdirSync(outputDirPdf, { recursive: true });
                    }

                    const inputFile = `uploads/pdf/${pdfFile}.pdf`,
                    outputFile = `${outputDirPdf}/${pdfFile}-${count <= 9 ? '0'+count : count}.pdf`;

                    const pdfDoc = new HummusRecipe(inputFile, outputFile),
                    dataBuffer = fs.readFileSync(inputFile);

                    const watermark = {
                        options: {
                            color: '#D3D3D3',
                            fontSize: 22,
                            font: 'monospace',
                            align: 'center center',
                            opacity: 0.4,
                            rotation: 30
                        },
                        text: `${record.data1}\n\n${record.data2}\n\n${record.data3}`,
                        align: 'center',
                        locationY: 320
                    };

                    pdfparse(dataBuffer).then(({ numpages }) => {
                        for (let i = 1; i <= numpages; i++) {
                            if(i === numpages) {
                                pdfDoc.editPage(i)
                                    .text(watermark.text, watermark.align, watermark.locationY, watermark.options)
                                    .endPage()
                                    .endPDF(() => {
                                        if(pdfFiles.length === index + 1) {
                                            resolve({
                                                error: false,
                                                message: 'Successfully applied watermark!',
                                                folderId
                                            });
                                        }
                                    });
                            }
                            else {
                                pdfDoc.editPage(i)
                                    .text(watermark.text, watermark.align, watermark.locationY, watermark.options)
                                    .endPage();
                            }
                        }
                    })
                    .catch(error => {
                        reject({
                            error: true,
                            message: error
                        });
                    });
                }));
                // console.timeEnd('Convert');
            });
        });
    }
}
