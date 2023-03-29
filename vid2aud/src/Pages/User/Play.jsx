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
    // setTime,
    audioRef
) {
    const sliderCurr = sliderRef.current
    console.log(audioRef.current.currentTime = sliderCurr.value)
    audioRef.current.pause();
    
    // setTime(sliderCurr.value)
}

async function commentAdd(
    commentRef,
    vidid,
    timeRef
) {

    const _id = Cookies.get('_id')

    // const vidInfo = await axios.post(
    //     '/getVidInfo', {
    //         user_id: _id,
    //         _id: vidid
    //     }
    // )

    // if(vidInfo.data.error) {
    //     return
    // }
    const comm = commentRef.current
    const ti = timeRef.current
    const commentResponse = await axios.post(
        '/createComment', {
            vid_id: vidid,
            comment: comm.value,
            time: ti.value
        }
    )

    console.log(commentResponse)
}

async function getDuration(vidid, setMax, setvidName) {
    
    
        const _id = Cookies.get('_id')
        const vidInfo = await axios.post(
            '/getVidInfo', {
                user_id: _id,
                _id: vidid
            }
        )
    setMax(vidInfo.data.duration)
    setvidName(vidInfo.data.name)
    // setVid(vidInfo.data)
    console.log("x", vidInfo.data.duration)
    
}


async function fetchCom(e, vid_id, setComments, setCommentsI) {
    const E = e.target
    if((Math.round(E.currentTime))%5 === 0) {
        const comments = await axios.post('getComments', {
            vid_id: vid_id,
            time: E.currentTime
        })
        console.log("comments are ", comments)
        setComments(comments.data)
        setCommentsI(0)
    }
    else return
}

function updateTag(e, tagRef, comments, commentsI, setCommentsI) {
    if(comments.annotations[commentsI] && comments.annotations[commentsI].time === Math.round(e.target.currentTime)) {
        tagRef.current.innerText = `${comments.annotations[commentsI].time}s: ${comments.annotations[commentsI].comment}`
        setCommentsI(commentsI+1)
    }
    
}

const setComments = (val) => {
    var commentI = localStorage.get('commenti')
    localStorage.set(`comment${commentI}`, val.annotations)
}


function Play() {
    
    const {
        vidid
    } = useParams()

    

    const sliderRef = useRef()
    const audioRef = useRef()
    
    // const [time, setTime] = useState(0)
    const timeRef = useRef()
    const tagRef = useRef()
    const commentRef = useRef()
    const [comments, setComments] = useState([])
    const [commentsI, setCommentsI] = useState()
    console.log(comments)

    // const [vid, setVid] = useState()
    const [max, setMax] = useState()
    const [vidName, setvidName] = useState("")
    // console.log("Playing")
    // console.log(max)
    // const _id = Cookies.get('_id')

    useEffect(() => {
        getDuration(vidid, setMax, setvidName)
        // setMax(vid.data.duration)
    }, [])//setTime, setMax, getDuration, setVid
    return (
        <div className="main_scrn">
            
            <div className="main_content" >
                <span style={{
                    marginTop: "30px",
                    marginBottom: 0
                }}>
                    <h1 style={{
                        display: "inline",
                        fontFamily: "sans-serif",
                        color: "white"
                    }}>Playing: </h1>
                    <h1 style={{
                        color: "rgb(255, 73, 73)",
                        fontFamily: "sans-serif",
                        display: "inline"
                    }}>{vidName}</h1>
                </span>
                <div className="play_info play_info_time">
                    
                    <output
                        htmlFor="player_slider"
                        className="timestamp_input"
                        ref={timeRef}
                        onFocus={() => audioRef.current.pause()}
                        onChange={e => {
                            audioRef.current.currentTime = e.target.value
                        }}
                    />

                    <audio
                        onTimeUpdate={e => {
                            sliderRef.current.value = Math.round(e.target.currentTime)
                            timeRef.current.value = Math.round(e.target.currentTime)
                            fetchCom(e, vidid, setComments, setCommentsI)
                            updateTag(e, tagRef, comments, commentsI, setCommentsI)  
                        }}
                        style={{display: "none"}}
                        ref={audioRef}
                        controls
                    >
                        <source src={`http://localhost:8000/play/${vidid}`} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                </div>

                <div className="sliderCont">
                    <input
                        value={0}
                        ref={sliderRef}
                        onChange={() => {
                            sliderChange(sliderRef, audioRef)
                            // sliderChange(sliderRef, setTime, audioRef)
                        }}
                        className="audioStreamSlider"
                        id="player_slider"
                        type="range"
                        min={0}
                        max={max}
                    />
                </div>
                
                <button className="toggleplay_btn" onClick={() => togglePlay(audioRef)}>Play/Pause</button>

                <div className="play_info play_info_comment">
                    <p ref={tagRef}></p>
                    <input ref={commentRef} type="text" placeholder={"Add comment"} />
                    <button onClick={e => {
                        commentAdd(commentRef, vidid, timeRef)
                        commentRef.current.value=""
                    }}>Add comment</button>
                </div>
            </div>
        </div>
    )
}

export {Play}