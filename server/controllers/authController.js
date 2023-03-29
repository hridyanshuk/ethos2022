import { User } from "../models/User.js"
import jwt from "jsonwebtoken"

import cookieParser from "cookie-parser"

const USERNOTFOUND = 2
const JWTVERIFYERROR = 4
const minAge = 5*24*60*60

function createToken(_id) {
    return jwt.sign({_id}, 'secret key', {
        expiresIn: minAge
    })
}


const authController = async (req, res) => {
    console.log(req.headers)
    const token = req.headers['x-auth-token']
    console.log("authenticate", token)
    if(!token) {
        res.json({
            authenticated: false
        })
    }
    else {
        jwt.verify(token, "secret key", async (err, decoded) => {
            if(err) {
                res.send(400).json({
                    errorCode: JWTVERIFYERROR,
                    error: "error while verifying JWT token"
                })
            }
            else {
                console.log(decoded)
                try {
                    await User.findById(decoded._id)
                    res.json({
                        authenticated: true,
                        _id: decoded._id
                    })
                }
                catch(err) {
                    res.json({
                        authenticated: false
                    })
                }
                
            }
        })
    }
}


const loginController = async (req, res) => {
    const {
        username,
        password
    } = req.body
    console.log("Sign in")
    console.log(req.body)
    try {
        const user = await User.findOne({
            username: username,
            password: password
        })
        const token = createToken(user._id)
        console.log(user)
        res.status(200).json({
            token: token,
            username: user.username,
            _id: user._id,
            expiresIn: 3
        })
    }
    catch(err) {
        res.status(200).json({
            error: "User not found",
            errorCode: USERNOTFOUND,
            err: err
        })
    }
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

function logoutController(req, res) {
    const token = req.headers['x-auth-token']
    console.log("LOGOUT")
    if(!token) {
        res.json({
            authenticated: false
        })
    }
    else {
        jwt.verify(token, "secret key", async (err, decoded) => {
            if(err) {
                console.log("ERROR")
                res.send(400).json({
                    errorCode: JWTVERIFYERROR,
                    error: "error while verifying JWT token"
                })
            }
            else {
                const newToken = createToken("logout")
                res.json({
                    authenticated: false,
                    token: newToken
                })
            }
        })
    }
}


export {
    loginController,
    signupController,
    authController,
    logoutController
}