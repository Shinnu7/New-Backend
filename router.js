const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

// Create uploads folder if not exists
const UPLOAD_FOLDER = './uploads';
if (!fs.existsSync(UPLOAD_FOLDER)) fs.mkdirSync(UPLOAD_FOLDER);

// Multer setup
const upload = multer({ dest: UPLOAD_FOLDER });

// --------------------- VIEW ALL IMAGES ---------------------
router.get('/view', (req, res) => {
    fs.readdir(UPLOAD_FOLDER, (err, files) => {
        if (err) {
            return res.status(500).json({ msg: "Error reading folder" });
        }

        const images = files.map(file => ({
            filename: file,
            url: `http://localhost:3000/uploads/${file}`
        }));

        console.log(images);
        res.json(images);
    });
});

// --------------------- UPLOAD IMAGE ---------------------
router.post('/upload', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: "File not uploaded" });
    }

    res.json({
        msg: "Image uploaded successfully",
        filename: req.file.filename,
        url: `http://localhost:3000/uploads/${req.file.filename}`
    });
});

module.exports = router;
