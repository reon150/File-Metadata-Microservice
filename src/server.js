require('dotenv').config();
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
const { unlinkSync } = require('fs');

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(cors());

const type = upload.single('file');

app.post('/api/fileanalyse', type, (req, res) => {
    try {
        if (req.file) {
            unlinkSync(req.file.path);
            res.status(200).json({
                filename: req.file.originalname,
                size: req.file.size,
                type: req.file.mimetype
            });
            
        } else {
            res.status(500).json({ error: 'No file was provided' });
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
