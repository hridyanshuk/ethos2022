import { useEffect, useRef, useState } from "react"
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { instance as axios } from "../../axios_stuff"

import "../../css/pages/user/video.css"



async function convert(userid, vidid) {
    await axios.post('/convert', {
        filename: vidid+".mp4",
        fileCount: vidid,
        user_id: userid
    })
}

function play(
    navigate,
    userid,
    vidid
) {
    navigate(`/main/${userid}/play/${vidid}`)
}

function VidInfo({
    mainRef,
    loaderRef,
    userid,
    vidid
}) {
    const [vidName, setVidName] = useState("")
    const [vidC, setVidC] = useState()
    console.log("Vid info")
    const navigate = useNavigate()

    useEffect(() => {
        // console.log()
        (async () => {
            const vidInfoRes = await axios.post('/getVidInfo', {
                user_id: userid,
                _id: vidid
            })
            const vidInfo = vidInfoRes.data
            setVidName(vidInfo.name)
            setVidC(vidInfo.count) 
        })()
    }, [])

    return (
        <div className="video_info">
            <h2 className="video_info_title">
                {vidName}
            </h2>
            <div className="hgt_100"></div>
            <div className="video_info_bottom">
                <button onClick={async () => {
                    mainRef.current.style.display = "block"
                    loaderRef.current.style.display = "block"
                    await convert(userid, vidC)
                    mainRef.current.style.display = "none"
                    loaderRef.current.style.display = "none"
                }}>Convert</button>
                {/* <button>Save</button> */}
                <button onClick={() => play(navigate, userid, vidid)}>Play</button>
            </div>
            <div className="video_info_footer">
                Video id: {vidC}
            </div>
        </div>
    )
}


function Video() {
    const {
        userid,
        vidid
    } = useParams()

    // const vidI = await axios.post('/getVidInfo', {
    //     user_id: userid,
    //     _id: vidid
    // })

    // const vid_id = vidI._id



    const navigate = useNavigate()
    
    // useEffect(() => {
    //     console.log(userid, vidid)
    //     if(vidid===undefined) {
    //         console.log(userid+"/collection")
    //         // navigate()
    //         console.log(vid_id, userid)
    //     }
    // }, [])
    const mainRef = useRef()
    const loaderRef = useRef()

    return (
        <div className="main_scrn">
            <div ref={loaderRef} style={{display:"none"}} className="loader-wrapper">
                <div className="loder-crcil"></div>
                <div className="loader-text">Converting ...</div>
            </div>
            <div className="main_content">
                <VidInfo loaderRef={loaderRef} mainRef={mainRef} userid={userid} vidid={vidid} />
            </div>
            <div ref={mainRef} className="full"></div>
        </div>
    )
}

export {Video}