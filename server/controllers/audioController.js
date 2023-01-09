import { PythonShell } from "python-shell"



function convertController(req, res) {
    console.log("Test route")

    const {
        filename,
        fileCount,
        user_id
    } = req.body

    let options = {
        mode: 'text',
        pythonPath: 'C:/Users/Hridyanshu/AppData/Local/Programs/Python/Python310/python.exe',
        pythonOptions: ['-u'], 
        scriptPath: 'C:/Users/Hridyanshu/Desktop/Github/ethos2022/server/pythonScripts',
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