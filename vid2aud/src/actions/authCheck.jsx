import Cookies from "js-cookie"
import { configInstance, instance as axios } from "../axios_stuff"
function isAuthenticated() {
    return (async () => {
        const auth = Cookies.get('auth')
        console.log("Auth", auth)
        if(auth===undefined) {
            console.log("Yoyo")
            const config = configInstance()
            const authResponse = await axios.get('/authenticate', config).then(response => response.data)
            console.log("authresponse", authResponse)
            if(authResponse.authenticated) {
                Cookies.set('auth', true)
                Cookies.set('_id', authResponse._id)
            }
            else {
                Cookies.set('auth', false)
                Cookies.remove('token')
                Cookies.remove('_id')
            }
            return authResponse.authenticated
        }
        else return auth==="true"
    })()
}

export {isAuthenticated}