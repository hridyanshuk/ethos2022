import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId

const audioSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    collection_id: {
        type: ObjectId,
        required: true
    },
    audio: {
        type: Buffer,
        required: true
    }
})

const collectionSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    collection: {
        type: Array,
        of: ObjectId
    }
})

const Collection = mongoose.model('collections', collectionSchema)
const Audio = mongoose.model('audios', audioSchema)

export {Collection, Audio}