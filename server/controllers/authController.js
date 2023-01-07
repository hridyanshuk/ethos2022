import { User } from "../models/User.js"
import cookieParser from "cookie-parser"

const loginController = (req, res) => {
    res.send("Sign in page")
    .status(200)
}

const signupController = async (req, res) => {

    const {
        name,
        email,
        username,
        password
    } = req.body
    console.log(req.body)
    try {
        await User.create({
            name,
            email,
            username,
            password
        })
        res
        .status(201)
        .send(`Added user ${username}`)
    }
    catch (err) {
        res
        .status(400)
        .send("User could not be created")
    }
}

export {
    loginController,
    signupController
}