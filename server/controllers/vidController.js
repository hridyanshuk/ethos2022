function uploadController(req, res) {
    const file = req.file;
    console.log(file)
    res.status(201).send({
        message: 'File uploaded successfully',
        filename: file.filename
    })
}

export {uploadController}