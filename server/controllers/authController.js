import { User } from "../models/User.js"
import jwt from "jsonwebtoken"

import cookieParser from "cookie-parser"

const USERNOTFOUND = 2

const minAge = 5*24*60*60

function createToken(id) {
    return jwt.sign({id}, 'secret key', {
        expiresIn: minAge
    })
}


const loginController = async (req, res) => {
    const {
        username,
        password
    } = req.body
    try {
        const user = await User.findOne({
            username: username,
            password: password
        })
        const token = createToken(user._id)
        res.json({
            token: token,
            username: user.username,
            _id: user._id,
            expiresIn: 3
        })
    }
    catch(err) {
        res.status(400).send({
            error: "User not found",
            errorCode: USERNOTFOUND
        })
    }
    res.send("Sign in page")
    .status(200)
}

const signupController = async (req, res) => {
    console.log(req.headers)
    const {
        name,
        email,
        username,
        password
    } = req.body
    console.log(req.body)
    try {
        const newUser = await User.create({
            name,
            email,
            username,
            password
        })

        const token = createToken(newUser._id)
        console.log(token)
        
        res.json({
            token,
            username: newUser.username,
            _id: newUser._id,
            expiresIn: 3
        })
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