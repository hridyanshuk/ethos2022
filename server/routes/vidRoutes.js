import { Router } from "express";
import { fileLogController, uploadController, vidInfoController, vidsController } from "../controllers/vidController.js";

import multer from "multer";
import Video from "../models/Video.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploadedFiles")
    },
    filename: async function (req, file, cb) {
        
        const count = await Video.countDocuments()

        
        cb(null, String(count)+"."+file.originalname.split('.')[file.originalname.split('.').length -1])
    }
})

const upload = multer({
    dest: "uploadedFiles",
    limits: { fileSize: 100000000 },
    storage: storage,
    onFileUploadStart: function () {
        console.log("Upload is starting...");
    },
    onFileUploadComplete: function () {
        console.log("File uploaded");
    }
})

const router = Router()

router.post(
    '/upload',
    upload.single('file'),
    uploadController
)


router.post(
    '/updateFile',
    fileLogController
)

router.post(
    '/getVidInfo',
    vidInfoController
)

router.post(
    '/collection',
    vidsController
)

export {router}