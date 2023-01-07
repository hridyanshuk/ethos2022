import { PythonShell } from "python-shell"



function testController(req, res) {
    console.log("Test route")

    let options = {
        mode: 'text',
        pythonPath: 'C:/Users/Hridyanshu/AppData/Local/Programs/Python/Python310/python.exe',
        pythonOptions: ['-u'], 
        scriptPath: 'C:/Users/Hridyanshu/Desktop/Github/ethos2022/server/pythonScripts',
        args: ['value1', 'value2', 'value3']
    }
    try {
        PythonShell.run('uploadedVid2Aud.py', options, function (err, results) {
            if (err) console.log(err)
            // results is an array consisting of messages collected during execution
            console.log('results: %j', results)
        })
    }
    catch(err) {
        console.log(err)
    }
    res.status(200).send("Converted Probably")
}

export {testController}