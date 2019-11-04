const fs = require('fs');

module.exports = class DownloadController {
    getFile(req, res) {
        const { f } = req.query;

        if(typeof f === 'undefined') {
            res.status(404).end();
            return;
        }

        const extension = f.split('.').pop().toLowerCase();

        let pathFile = `uploads`;

        if(extension === 'zip') {
            pathFile += `/output/${f}`;
        }
        else if (extension === 'csv' || extension === 'pdf') {
            pathFile += `/${extension}/${f}`;
        }
        else {
            res.status(404).end();
            return;
        }

        res.download(pathFile);
    }
}