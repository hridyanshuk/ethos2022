import { useEffect, useRef, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { instance as axios } from "../../axios_stuff"

import "../../css/pages/user/video.css"


function VidInfo({
    userid,
    vidid
}) {
    const [vidName, setVidName] = useState("")
    console.log("Vid info")

    useEffect(() => {
        // console.log()
        (async () => {
            const vidInfoRes = await axios.post('/getVidInfo', {
                user_id: userid,
                count: vidid
            })
            const vidInfo = vidInfoRes.data
            setVidName(vidInfo.name)         
        })()
    }, [])

    return (
        <div className="video_info">
            <h2 className="video_info_title">
                {vidName}
            </h2>
            <div className="hgt_100"></div>
            <div className="video_info_bottom">
                <button>Convert</button>
                <button>Save</button>
                <button>Play</button>
            </div>
            <div className="video_info_footer">
                Video id: {vidid}
            </div>
        </div>
    )
}


function Video() {
    const {
        userid,
        vidid
    } = useParams()

    const navigate = useNavigate()
    
    useEffect(() => {
        console.log(userid, vidid)
        if(vidid===undefined) {
            console.log(userid+"/collection")
            // navigate()
            console.log(vidid, userid)
        }
    }, [])

    return (
        <div className="main_scrn">
            <div className="main_content">
                <VidInfo userid={userid} vidid={vidid} />
            </div>
        </div>
    )
}

export {Video}