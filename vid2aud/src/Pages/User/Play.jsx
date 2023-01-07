import { FileInput, LinkInput } from "../../components/components"
import { NavBar } from "../Home"

function Player() {
    
}

function Play() {
    
    return (
        <div className="main_scrn">
            <NavBar />
            <div className="main_content" >
                <audio src="http://localhost:8000/test/audio" controls/>
            </div>
                

        </div>
    )
}

export {Play}