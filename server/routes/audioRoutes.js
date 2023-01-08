import { Router } from "express";
import { convertController } from "../controllers/audioController.js";
import path from "path"
import fs from "fs"

const cwd = process.cwd();

const router = Router()

router.post(
    '/convert',
    convertController
)
router.get('/test/audio', (req, res) => {
    res.sendFile('convertedAudio/output.mp3', { root: cwd });
})

router.get('/test/audio2', (req, res) => {
    const readStream = fs.createReadStream('convertedAudio/output.mp3');
    readStream.pipe(res);
})

export {router}