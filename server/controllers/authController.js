import { User } from "../models/User.js"
import jwt from "jsonwebtoken"

import cookieParser from "cookie-parser"

const minAge = 5*24*60*60

function createToken(id) {
    return jwt.sign({id}, 'secret key', {
        expiresIn: minAge
    })
}


const loginController = (req, res) => {
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