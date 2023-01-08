import { Router } from "express"
import { authController, loginController, signupController } from "../controllers/authController.js"

const router = Router()

router.post(
    '/signin',
    loginController
)

router.post(
    '/signup',
    signupController
)

router.get(
    '/authenticate',
    authController
)

export {router}