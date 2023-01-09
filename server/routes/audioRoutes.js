import { Router } from "express";
import { convertController } from "../controllers/audioController.js";
import path from "path"
import fs from "fs"
import { request } from "http";
import Video from "../models/Video.js";

const cwd = process.cwd();

const router = Router()

router.post(
    '/convert',
    convertController
)
router.get('/play/:vidid', async (req, res) => {
    const {vidid} = req.params
    // const audioCount = vidid
    console.log("Play", vidid)

    try {
        const data = await Video.findOne({
            _id: vidid
        })
        console.log(data)
        // console.log(`convertedAudio/${data.count}.mp3`)
        res.sendFile(`convertedAudio/${data.count}.mp3`, { root: cwd });
    }
    catch (err) {
        res.status(400)
    }

    
})

router.get('/test/audio2', (req, res) => {
    const readStream = fs.createReadStream('convertedAudio/output.mp3');
    readStream.pipe(res);
})

export {router}