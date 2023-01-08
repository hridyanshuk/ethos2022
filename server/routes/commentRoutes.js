import { Router } from "express"
import { createCommentController, fetchController } from "../controllers/commentController.js"

const router = Router()

router.post(
    '/getComments',
    fetchController
)

router.post(
    '/createComment',
    createCommentController
)

export {router}