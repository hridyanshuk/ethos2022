import { Link } from "react-router-dom"

import "../css/pages.css"
import "../css/loader.css"
// import "../css/components.css"
import { FileInput, LinkInput } from "../components/components"
import { useRef } from "react"


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
    const loaderRef = useRef()
    const mainRef = useRef()
    return (
        <div ref={mainRef} className="main_scrn">
            
            <div ref={loaderRef} style={{display:"none"}} className="loader-wrapper">
                <div className="loder-crcil"></div>
                <div className="loader-text">Uploading ...</div>
            </div>
            
            <NavBar />
            <div className="main_content jstfy_centre">          
                <LinkInput />
                <FileInput mainRef={mainRef} loaderRef={loaderRef} navigateTo = "/play"/>
            </div>
                

        </div>
    )
}

export {Home, NavBar}