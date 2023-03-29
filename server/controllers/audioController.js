import { PythonShell } from "python-shell"

import fs from "fs"
const cwd = process.cwd();

function convertController(req, res) {
    console.log("Test route")

    const {
        filename,
        fileCount,
        user_id
    } = req.body

    let options = {
        mode: 'text',
        pythonPath: `${cwd}/python/python.exe`,
        pythonOptions: ['-u'], 
        scriptPath: `${cwd}/pythonScripts`,
        args: [filename, fileCount]
    }
    try {
        PythonShell.run('uploadedVid2Aud.py', options, function (err, results) {
            if (err) console.log(err)
            // results is an array consisting of messages collected during execution
            console.log('results:', results)
            res.status(200).send("Converted Probably")
        })
    }
    catch(err) {
        console.log(err)
    }
    
}


// function convertController() {

// }

export {convertController}