const fs        = require('fs');
const archiver  = require('archiver');

module.exports = class ZipController {
    static generateZipFile(folderId) {
        return new Promise((resolve, reject) => {
            const outputDir = `uploads/output/${folderId}`;

            const output = fs.createWriteStream(`uploads/output/${folderId}.zip`),
            archive = archiver('zip', {
                zlib: { level: 9 }
            });

            output.on('close', () => {
                resolve({ error: false, message: 'Successfully compressed file!' });
            });
            archive.on('warning', err => {
                if(err.code !== 'ENOENT') {
                    reject({ error: true, message: err });
                }
            });
            archive.on('error', err => {
                reject({ error: true, message: err })
            });

            archive.directory(outputDir, `downloaded-files-${folderId}`);
            archive.pipe(output);

            archive.finalize();
        });
    }
}