import { Router } from "express";
import { uploadController } from "../controllers/vidController.js";

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploadedFiles")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+"."+file.originalname.split('.')[file.originalname.split('.').length -1])
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

export {router}