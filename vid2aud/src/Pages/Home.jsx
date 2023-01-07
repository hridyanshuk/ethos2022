import { Link } from "react-router-dom"

import "../css/pages.css"
// import "../css/components.css"
import { FileInput, LinkInput } from "../components/components"


function NavBar() {
    return (
        <div className="home_navbar">
            <ul>
                <li>
                    <Link className="nav_link" to='/'>Home</Link>
                </li>
                <li>
                    <Link className="nav_link" to='/about'>About</Link>
                </li>
                <li>
                    <Link className="nav_link" to='/developers'>Developers</Link>
                </li>
                <li>
                    <Link className="nav_link" to='/contact'>Contact Us</Link>
                </li>
                <li>
                    <Link className="nav_link" to='/auth'>Account</Link>
                </li>
            </ul>
        </div>
    )
}

// function LinkInput() {
//     return (
//         <div className="link_input">
//             <input type="url" placeholder="Enter url" />
//         </div>
//     )
// }

// function FileInput() {
//     return (
//         <div className="file_input">
//             <label for="file_upload" class="file_upload_label">
//                 Upload File
//             </label>
//             <input id="file_upload" type="file" accept=".mp4, .avi, .mov" />
//         </div>
//     )
// }

function Home() {
    
    return (
        <div className="main_scrn">
            <NavBar />
            <div className="main_content jstfy_centre">          
                <LinkInput />
                <FileInput />
            </div>
                

        </div>
    )
}

export {Home, NavBar}