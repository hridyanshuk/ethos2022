import { FileInput, LinkInput } from "../../components/components"
import { NavBar } from "../Home"

import "../../css/pages/user/video.css"
import "../../css/pages/user/play.css"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { instance as axios } from "../../axios_stuff"
import Cookies from "js-cookie"

function Player() {
    
}

function togglePlay(audioRef) {
    if (audioRef.current.paused) {
        audioRef.current.play();
    } else {
        audioRef.current.pause();
    }
}

function sliderChange(
    sliderRef,
    setTime,
    audioRef
) {
    const sliderCurr = sliderRef.current
    console.log(audioRef.current.currentTime = sliderCurr.value)
    audioRef.current.pause();
    
    setTime(sliderCurr.value)
}

async function commentAdd(
    commentRef,
    vidid,
    timeRef
) {

    const _id = Cookies.get('_id')

    const vidInfo = await axios.post(
        '/getVidInfo', {
            user_id: _id,
            count: vidid
        }
    )

    if(vidInfo.data.error) {
        return
    }
    const comm = commentRef.current
    const ti = timeRef.current
    const commentResponse = await axios.post(
        '/createComment', {
            vid_id: vidInfo.data._id,
            comment: comm.value,
            time: ti.value
        }
    )

    console.log(commentResponse)
}

async function getDuration(vidid, setMax, setVid) {
    
    
        const _id = Cookies.get('_id')
        const vidInfo = await axios.post(
            '/getVidInfo', {
                user_id: _id,
                count: vidid
            }
        )
    setMax(vidInfo.data.duration)
    setVid(vidInfo.data)
    console.log("x", vidInfo.data.duration)
    
}


async function fetchCom(e, vid_id, setComments) {
    if((Math.round(e.target.currentTime))%10 === 0) {
        const comments = await axios.post('getComments', {
            vid_id: vid_id,
            time: e.target.currentTime
        })
        console.log("comments are ", comments)
        setComments(comments.data)
    }
    else return
}


function Play() {
    
    const {
        vidid
    } = useParams()

    const sliderRef = useRef()
    const [time, setTime] = useState(0)
    const audioRef = useRef()
    const timeRef = useRef()

    const commentRef = useRef()
    const [comments, setComments] = useState([])

    console.log(comments)

    const [vid, setVid] = useState()
    const [max, setMax] = useState()

    console.log("Playing")
    console.log(max)
    const _id = Cookies.get('_id')

    useEffect(() => {
        getDuration(vidid, setMax, setVid)
        sliderRef.current.value = 0
        setTime(0)
        // setMax(vid.data.duration)
    }, [setTime, setMax, getDuration, setVid])
    return (
        <div className="main_scrn">
            <div className="main_content" >
                
                <div className="video_info">
                    <input
                    ref={timeRef}
                    value={time}
                    onFocus={() => audioRef.current.pause()}

                    

                    onChange={e => {
                        audioRef.current.currentTime = e.target.value

                    }} ></input>
                    <audio onTimeUpdate={e => {
                        sliderRef.current.value = Math.round(e.target.currentTime)
                        timeRef.current.value = Math.round(e.target.currentTime)
                        fetchCom(e, vid._id, setComments)

                    }} style={{display: "none"}} ref={audioRef} controls autoplay>
                        <source src={`http://localhost:8000/play/${vidid}`} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <input ref={sliderRef} onChange={() => {
                    sliderChange(sliderRef, setTime, audioRef)
                }} className="audioStreamSlider" type="range" min={0} max={max}/>
                <button onClick={() => togglePlay(audioRef)}>Play/Pause</button>

                <div className="video_info">
                    <input ref={commentRef} type="text" />
                    <button onClick={e => commentAdd(commentRef, vidid, timeRef)}>Add comment</button>
                </div>
            </div>
        </div>
    )
}

export {Play}