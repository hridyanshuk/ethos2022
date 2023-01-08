import mongoose from "mongoose";
import { ObjectId } from "./Collection.js";

const annotationSchema = mongoose.Schema({
    vid_id: {
        type: ObjectId
    },
    comment: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

export default mongoose.model('annotations', annotationSchema)