import { NavBar } from "./Home"
import "../css/pages.css"

function About() {
    return (
        <div className="main_scrn">
            {/* <NavBar/> */}
            {/* <div className="main_content" > */}
                <div className="about_pg">
                    <h1>About this application</h1>
                    This is a Video to Audio conversion web application. You can upload a video either from your local machine, or 
                    upload a link to a youtube video, and the application will extract the audio portion of the video and allow you 
                    to stream/download/save it.
                </div>
            {/* </div> */}
        </div>
    )
}

export {About}