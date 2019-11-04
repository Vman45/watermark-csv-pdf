const { generateWaterMark } = require('./WatermarkController');
const { generateZipFile }   = require('./ZipController');

module.exports = class FileController {
    async handleFiles(req, res) {
        res.setHeader('Content-Type', 'application/json');
        const { csvFile, pdfFiles } = req.query;

        const response = await generateWaterMark(csvFile, pdfFiles);

        return res.status(response.error ? 500 : 200).json(response);
    }

    async compressFile(req, res) {
        res.setHeader('Content-Type', 'application/json');
        const { folderId } = req.query;

        const response = await generateZipFile(folderId);

        return res.status(response.error ? 500 : 200).json(response);
    }
}