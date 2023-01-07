import { Router } from "express"
import { loginController, signupController } from "../controllers/authController.js"

const router = Router()

router.get(
    '/login',
    loginController
)

router.post(
    '/signup',
    signupController
)


export {router}