import { useState } from "react"
import "../css/components.css"
import axios from "../axios_stuff"

function LinkInput() {
    return (
        <div className="link_input">
            <input type="url" placeholder="Enter url" />
        </div>
    )
}


// function fileChunking(file, size) {
//     let chunk = 2*1042*1042
//     let x=size/chunk
//     if(x*chunk < size) x++
//     for(var i=0 ; i<x ; i++) {
//         const data = {
//             index: i,
//             video: file.substring(i*chunk, chunk)
//         }
        
//         axios.post(
//             '/upload',
//             data,
//         )
//         .then((res) => console.log(res))

//     }
// }


function FileInput() {

    const [file, setFile] = useState()
    return (
        <div className="file_input">
            <label htmlFor="file_upload" className="file_upload_label">
                Upload File
            </label>
            <input id="file_upload" type="file" accept=".mp4, .avi, .mov" onChange={async (e) => {
                var vid=e.target.files[0]
                console.log(vid)
                // const reader = new FileReader();
                // reader.readAsDataURL(vid);
                // reader.onload = async () => {
                //     const fileContents = reader.result;
                //     // do something with the file contents
                //     const data = {
                //         video: fileContents
                //     }
                
                
                const formData = new FormData();
                formData.append('file', vid)
                formData.append('name', "12314")
                
                await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    console.log(response.data);
                })

                
            }}/>
        </div>
    )
}



export {LinkInput, FileInput}