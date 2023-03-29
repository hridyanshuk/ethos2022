import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: "http://localhost:8000/"
})

// const instance = axios.create({
//     baseURL: "https://ethos-team-m.onrender.com/"
// })
function getHeaders() {
    const token = Cookies.get('token')
    console.log(token)
    return {'x-auth-token': token}
}

function configInstance() {
    var xAuthToken = getHeaders()
    const token = Cookies.get('token')
    
    return {
        headers: {
            "x-auth-token": token
        }
    }
}

export {instance, getHeaders, configInstance}