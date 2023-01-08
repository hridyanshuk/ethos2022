import mongoose from "mongoose";
import { ObjectId } from "./Collection.js";

const videoCountSchema = mongoose.Schema({
    user_id:{
        type: ObjectId,
        required: true
    },
    count: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    ext: {
        type: String
    }
})


export default mongoose.model('video', videoCountSchema)