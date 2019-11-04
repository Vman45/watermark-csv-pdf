const cors                  = require('cors');
const fileUpload            = require('express-fileupload');

const UploadController      = require('./controller/UploadController');
const FileController        = require('./controller/FileController');
const DownloadController    = require('./controller/DownloadController');

module.exports = class Route {
    constructor(app) {
        this.app                    = app;
        this.uploadController       = new UploadController;
        this.fileController         = new FileController;
        this.DownloadController     = new DownloadController;
    }

    setup() {
        this.app.use(cors());
        this.app.use(fileUpload());

        this.app.post('/upload', this.uploadController.saveUpload);
        this.app.delete('/upload', this.uploadController.deleteUpload);

        this.app.post('/handle-files', this.fileController.handleFiles);
        this.app.post('/zip-files', this.fileController.compressFile);

        this.app.get('/download', this.DownloadController.getFile);
    }
}