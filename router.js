const { log } = require('console')
const express = require('express')
const multer = require('multer')
const fs = require('fs')

const router = express.Router()

const upload = 'uploads';

if (!fs.existsSync(upload)) fs.mkdirSync(upload)
    
    router.get('/view', (req, res) => {
        fs.readdir('uploads', (err, files) => {
            if (err) {
                return res.status(500).json({
                msg: "error in reading folder"
            })
        }
        const images = files.map(file => ({
            filename: file,
            url: `http://localhost:3000/uploads/${file}`
        }))
        log(images)
        res.json(images)
    })
})

const uploads = multer({ dest: './uploads/' })

router.post('/upload', uploads.single('avtar'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            msg: "file not uploaded"
        })
    }
    res.send({
        msg: "Image uploaded successfully",
        filename: req.file.filename,
        url: `http://localhost:3000/uploads/${req.file.filename}`
    })
})
module.exports = router