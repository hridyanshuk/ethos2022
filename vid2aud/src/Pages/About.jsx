import { NavBar } from "./Home"
import "../css/pages.css"

function About() {
    return (
        <div className="main_scrn">
            <NavBar/>
            <div className="main_content" >
                <div className="about_pg">
                    <h1>About this application</h1>
                    This is a Video to Audio conversion web application. You can upload a video either from your local machine, or 
                    upload a link to a youtube video, and the application will extract the audio portion of the video and allow you 
                    to stream it.
                    <br />
                    <br />
                    <h1>Created by</h1>
                    This application was created by Team M, participating in Ethos IIT Guwahati.
                    
                </div>
            </div>
        </div>
    )
}

export {About}