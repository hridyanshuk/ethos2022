import Annotation from "../models/Annotation.js"

async function fetchController(req, res) {
    const {
        vid_id,
        time
    } = req.body

    const rangeQuery = { $lt: time+10, $gte: time }
    try {
        const annotations = await Annotation.find({
            vid_id: vid_id,
            time: rangeQuery
        })
        res.json({
            annotations: annotations
        })
    }
    catch(err) {
        res.json({
            error: "Error finding annotations",
            err: err
        })
    }
}

async function createCommentController(req, res) {
    const {
        vid_id,
        comment,
        time
    } = req.body
    console.log("New comment API")
    try {
        
        const newComment = await Annotation.create({
            vid_id: vid_id,
            comment: comment,
            time: time
        })

        res.json({
            added: newComment
        })

    }
    catch(err) {
        res.json({
            error: "Error adding annotation",
            err: err
        })
    }
}

export {fetchController, createCommentController}