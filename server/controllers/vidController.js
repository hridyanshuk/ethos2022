import Video from "../models/Video.js";

function uploadController(req, res) {
    const file = req.file;
    console.log(file)
    res.status(201).send({
        message: 'File uploaded successfully',
        filename: file.filename,
        originalName: file.originalname
    })
}

async function fileLogController(req, res) {
    const {
        _id,
        fileName,
        originalName
    } = req.body

    var nm = Number(fileName.split('.')[0])
    console.log(req.body)
    const vid = await Video.create({
        user_id: _id,
        count: nm,
        name: originalName,
        ext: fileName.split('.')[fileName.split('.').length-1]
    })
    console.log(vid)
    res.json(vid)
}

async function vidInfoController(req, res) {
    const {
        user_id,
        count
    } = req.body

    try {
        const ret = await Video.findOne({
            user_id,
            count
        })
        res.json(ret)
    }
    catch (err) {
        res.send({
            error: "Not found"
        })
    }
}

export {uploadController, fileLogController, vidInfoController}