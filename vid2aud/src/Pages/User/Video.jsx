import { useParams } from "react-router-dom"

function Video() {
    const {
        userid,
        vidid
    } = useParams()

    if(userid === undefined) {

    }

    else if(vidid === undefined) {
        return (
            <div className="search_vid">
                
            </div>
        )
    }

    return (
        <div className="video_page">

        </div>
    )
}

export {Video}