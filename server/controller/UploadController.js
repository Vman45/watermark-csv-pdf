const fs  = require('fs');
// const md5 = require('md5');

const { replaceAllNonAlpha } = require('../../src/Library/Custom');

module.exports = class UploadController {
    saveUpload(req, res) {
        res.setHeader('Content-Type', 'application/json');
        const { userFile }   = req.files;

        // const filename  = md5(userFile.name);
        const filename  = replaceAllNonAlpha(userFile.name);
        const extension = userFile.name.split('.').pop().toLowerCase();

        // if(fs.existsSync(`uploads/${extension}/${filename}.${extension}`)) {
        //     res.status(500).json({ message: `O arquivo '${userFile.name}' já foi enviado!` });
        //     return;
        // }

        let errorMsg = '';

        userFile.mv(`uploads/${extension}/${filename}.${extension}`, err => {
            if(err) {
                errorMsg = err;
            }
        });

        if(errorMsg.length > 0) {
            res.status(500).json({ message: errorMsg });
            return;
        }

        res.status(200).json({ filename });
    }

    deleteUpload(req, res) {
        res.setHeader('Content-Type', 'application/json');
        const { file } = req.query;

        const extension = file.name.split('.').pop().toLowerCase();
        const fullPath = `uploads/${extension}/${replaceAllNonAlpha(file.name)}.${extension}`;

        let errorMsg = '';

        if(fs.access(fullPath, fs.F_OK, err => {
            if(err) {
                errorMsg = `Internal error: ${err}`;
                return;
            }

            fs.unlink(fullPath, err => {
                if(err) {
                    errorMsg = `Internal error: ${err}`;
                    return;
                }
            });
        }));

        if(errorMsg.length > 0) {
            res.status(500).json({ message: errorMsg });
            return;
        }

        res.status(200).end();
    }
}