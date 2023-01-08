import { useEffect, useRef, useState } from "react"
import "../css/components.css"
import {configInstance, instance as axios} from "../axios_stuff"

import { redirect, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { isAuthenticated } from "../actions/authCheck"


function LinkInput() {
    return (
        <div className="link_input">
            <input type="url" placeholder="Enter url" />
        </div>
    )
}



async function uploadFile(e, setNofFiles) {
    var vid=e.target.files[0]
    console.log(vid)
    setNofFiles(e.target.files.length)
    
    // const reader = new FileReader();
    // reader.readAsDataURL(vid);
    // reader.onload = async () => {
    //     const fileContents = reader.result;
    //     // do something with the file contents
    //     const data = {
    //         video: fileContents
    //     }
    
    
    // const formData = new FormData();
    // formData.append('file', vid)
    // formData.append('name', "12314")
    
    // await axios.post('/upload', formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    // })
    // .then(response => {
    //     console.log(response.data);
    // })
}




function FileInput({
    loaderRef,
    mainRef,
    navigateTo
}) {
    
    const fileRef=useRef()
    const navigate = useNavigate()
    const [nofFiles, setNofFiles] = useState(0)
    
    const [file, setFile] = useState()

    return (
        
        <div className="file_input">
            <label htmlFor="file_upload" className="file_upload_label">
                Browse
            </label>
            <input ref={fileRef} id="file_upload" type="file" accept="video/*" onChange={e => uploadFile(e, setNofFiles)}/>
            
            

            {(function () {
                if(nofFiles === 1) return (
                    <>
                        <button className="upload_button" id="file_upload_button" onClick={async (e) => {
                            loaderRef.current.style.display="block"

                            mainRef.current.style.backgroundColor="#7a7a7a71"

                            const targ = fileRef.current
                            const vid = targ.files[0] 

                            const formData = new FormData()
                            formData.append('file', vid)
                            const isLoggedIn = await isAuthenticated()
                            
                            

                            await axios.post('/upload', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            .then(response => {
                                console.log(response.data);
                            })
                            fileRef.current.value = ""
                            console.log(fileRef.current.files.length)
                            loaderRef.current.style.display="none"
                            mainRef.current.style.backgroundColor="#3A3A3A"
                            setNofFiles(0)

                            navigate(navigateTo)

                        }}>Upload file</button>
                </>
                )})()}
                
        </div>
    )
}

function UploadSources() {
    const linkRef = useRef()
    const fileRef = useRef()

    return (
        <div className="upload_sources">
            <LinkInput ref={linkRef} />
            <FileInput ref={fileRef} />
        </div>
    )

}

export {LinkInput, FileInput}