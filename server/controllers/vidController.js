import { PythonShell } from "python-shell";
import { Collection } from "../models/Collection.js";
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

    let options = {
        mode: 'text',
        pythonPath: 'C:/Users/Hridyanshu/AppData/Local/Programs/Python/Python310/python.exe',
        pythonOptions: ['-u'], 
        scriptPath: 'C:/Users/Hridyanshu/Desktop/Github/ethos2022/server/pythonScripts',
        args: [fileName]
    }

    try {
        PythonShell.run('duration.py', options, async function (err, results) {
            if (err) console.log(err)
            console.log('results:', results)
            
            console.log(results)
            const duration = results[0]
            console.log(duration)
            const vid = await Video.create({
                user_id: _id,
                count: nm,
                name: originalName,
                ext: fileName.split('.')[fileName.split('.').length-1],
                duration: duration
            })
            console.log(vid)
            res.json(vid)
        })
        
    }
    catch (error) {
        res.status(400).json(error)
    }

    
}

async function vidInfoController(req, res) {
    const {
        user_id,
        _id
    } = req.body

    try {
        const ret = await Video.findOne({
            user_id,
            _id
        })
        res.json(ret)
    }
    catch (err) {
        res.send({
            error: "Not found"
        })
    }
}


async function vidsController(req, res) {
    const {
        user_id
    } = req.body

    console.log(req.body)

    try {
        const audios = await Video.find({user_id: user_id})
        console.log(audios)

        res.json({
            audios
        })
    }
    catch(err) {
        console.log(err)
        res.json({
            error: "Could not find collection",
            err: err
        })
    }

}


export {uploadController, fileLogController, vidInfoController, vidsController}