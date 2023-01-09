import { Link } from "react-router-dom"

import "../css/pages.css"
import "../css/loader.css"
// import "../css/components.css"
import { FileInput, LinkInput } from "../components/components"
import { useEffect, useRef, useState } from "react"
import { isAuthenticated } from "../actions/authCheck"


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
    const [logged, setLogged] = useState(false)
    useEffect(() => {
        (async function() {
            const isLoggedIn = await isAuthenticated()
            console.log("Is logged in", isLoggedIn)
            setLogged(isLoggedIn)
        })()

    }, [setLogged])

    return (
        <div className="main_scrn">
            <div ref={loaderRef} style={{display:"none"}} className="loader-wrapper">
                <div className="loder-crcil"></div>
                <div className="loader-text">Uploading ...</div>
            </div>
            
            <div className="flex space-evenly">          
                <div className="flex flex-col align-center justify-center space-evenly imageHome">
                    <div>
                        <img src="Video.png" height={"200px"}/>
                    </div>
                    <div>
                        <img src="downarrow3.png" height={"100px"} />
                    </div>
                    <div>
                        <img src="audio.png" height={"200px"}/>
                    </div>
                </div>
                <div className="main_content">
                    <NavBar />
                    {(()=>{
                        if(logged) {
                            console.log("UPLOADDD")
                            return (
                                <div className="homepg flex flex-col justify-center yscroll">
                                    <div className="home_logo">
                                        <div>
                                            <h1 className="ethosiitg">Ethosiitg</h1>
                                            <h2 className="saptanglabs">Saptang Labs</h2>
                                            <h2 className="saptanglabs2">problem statement</h2>
                                        </div>
                                    </div>
                                    <LinkInput />
                                    <FileInput mainRef={mainRef} loaderRef={loaderRef}/>
                                </div>
                            )
                        }
                        else {
                            
                            return (
                                <div className="home_logo">
                                    <div>
                                        <h1 className="ethosiitg">Ethosiitg</h1>
                                        <h2 className="saptanglabs">Saptang Labs</h2>
                                        <h2 className="saptanglabs2">problem statement</h2>
                                    </div>
                                </div>
                            )
                        }
                    })()}
                        
                </div>
                
            </div>
                
            <div ref={mainRef} className="full"></div>

        </div>
    )
}

export {Home, NavBar}