import { Router } from "express";
import { convertController } from "../controllers/audioController.js";
import path from "path"
import fs from "fs"
import { request } from "http";

const cwd = process.cwd();

const router = Router()

router.post(
    '/convert',
    convertController
)
router.get('/play/:vidid', (req, res) => {
    const {vidid} = req.params
    const audioCount = vidid
    console.log("Play", vidid)
    res.sendFile(`convertedAudio/${audioCount}.mp3`, { root: cwd });
})

router.get('/test/audio2', (req, res) => {
    const readStream = fs.createReadStream('convertedAudio/output.mp3');
    readStream.pipe(res);
})

export {router}