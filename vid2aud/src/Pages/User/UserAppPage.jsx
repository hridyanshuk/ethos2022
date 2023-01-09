import { LeftNavBar } from "../../components/LeftNavBar"
import { RightNavBar } from "../../components/RightNavBar"
import { About } from "../About"
import { Contact } from "../Contact"
import { Developers } from "../Developers"
import { Home } from "../Home"
import { Play } from "./Play"

import "../../css/pages.css"
import { configInstance, instance as axios } from "../../axios_stuff"
import Cookies from "js-cookie"
import { Navigate, useNavigate } from "react-router-dom"
import { isAuthenticated } from "../../actions/authCheck"


// routes.push({
//     routeName: "Play",
//     route: "/main/play",
//     element: <>Play</>
// })




function LeftMain() {

    var routes = []
    routes.push({
        routeName: "",
        route: '/',
        element: <Play />
    })
    routes.push({
        routeName: "Collection",
        route: '/collection',
        element: <>Collection</>
    })
    

    return (
        <RightNavBar />
    )
}

var innerRoutes = []

innerRoutes.push({
    routeName: "Uploaded",
    route: '/',
    element: <LeftMain />
})

innerRoutes.push({
    routeName: "Collection",
    route: '/collection',
    element: <>Collection</>
})

function logoutFn(navigate) {
    
    (async() => {
        const config = configInstance()
        const logoutResponse = await axios.get('/logout', config)
        console.log("logoutResponse", logoutResponse)
        Cookies.set('auth', Boolean(logoutResponse.data.authenticated))
        Cookies.set('token', logoutResponse.data.token)
        Cookies.set('_id', "logout")
        navigate('/')
    })()
}





function UserApp() {
    const navigate = useNavigate()
    var routes=[]

    routes.push({
        routeName: "Home",
        route: "/",
        element: <Home />
    })


    routes.push({
        routeName: "About",
        route: "/about",
        element: <About />
    })

    routes.push({
        routeName: "Developers",
        route: "/developers",
        element: <Developers />
    })

    routes.push({
        routeName: "Contact Us",
        route: "/contact",
        element: <Contact />
    })

    const _id = Cookies.get('_id')

    routes.push({
        routeName: "Dashboard",
        route: `/main/${_id}`,
        element: <Play />
    })
    routes.push({
        routeName: "Collection",
        route: `/main/${_id}/collection`,
        element: <>Collection</>
    })
    routes.push({
        routeName: "Log out",
        route: '/auth',
        onClick: () => logoutFn(navigate)
    })
    return (
        <div className="main_scrn">
            <div className="main_content" >
                <LeftNavBar routes={routes}/>
            </div>
        </div>
    )
}

export {UserApp}