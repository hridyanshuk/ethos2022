import express from "express";
import mongoose from "mongoose";
import {router as authRoutes} from "./routes/authRoutes.js";
import {router as vidRoutes} from './routes/vidRoutes.js'
import {router as testRoutes} from './routes/testRoutes.js'
import cookieParser from "cookie-parser";
import cors from "cors"
import bodyParser from "body-parser";


const app = express()

// app.use(cors)
// app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(cookieParser())

// app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
const port = process.env.PORT || 8000

const dbURL = "mongodb+srv://vidaud_admin:KeuWTX6NQDlYNnGf@cluster0.j0xpt8p.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(dbURL)
.then(() => {
    console.log("Database connected")
    app.listen(port, () => {
        console.log(`Listening on ${port}`)
    })
})
.catch(err => {
    console.log("Could not connect to database")
})




// Routes for authentication
app.use(authRoutes)
app.use(vidRoutes)
app.use(testRoutes)