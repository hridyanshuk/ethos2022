import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { instance as axios } from "../../axios_stuff"
import '../../css/pages/user/collection.css'

function VidBox({
    name,
    vidCount,
    navigate,
    vid_id,
    user_id
}) {
    return (
        <div onClick={() => {
            navigate(`/main/${user_id}/video/${vid_id}`)
        }} className="vidbox">
            <div className="vidbox_name">
                {name}
            </div>
            <div className="vidbox_id">
                {vidCount}
            </div>
        </div>
    )
}

async function Vids(setVids) {
    const _id = Cookies.get("_id")
    const vids = await axios.post('/collection', {
        user_id: _id
    })
    console.log(vids.data)
    
    setVids(vids.data)
}

function Collection() {
    // Vids()
    const [vids, setVids] = useState([])
    const _id = Cookies.get("_id")
    console.log("vids", vids)
    
    useEffect(() => {
        axios.post('/collection', {
            user_id: _id
        })
        .then(res => setVids(res.data.audios))

    }, [])

    console.log(vids)
    // const list = Array.from(vids).map((e) => { return <VidBox name={e.name} />})
    // const list = Object.keys(vids).map((key) => [Number(key), vids[key]])
    // console.log(typeof(list))
    const navigate = useNavigate()
    return (
        <div className="main_scrn">
            <div className="main_content">
                <div className="collection_pg">
                    <h1>Collection of videos</h1>
                    {
                        vids.map((e) => { return <VidBox vid_id={e._id} navigate={navigate} user_id={e.user_id} name={e.name} vidCount={e.count} />})
                    }
                </div>
            </div>
        </div>
    )
}
export {Collection}