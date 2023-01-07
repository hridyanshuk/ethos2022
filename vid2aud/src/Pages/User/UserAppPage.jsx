import { LeftNavBar } from "../../components/LeftNavBar"
import { RightNavBar } from "../../components/RightNavBar"
import { About } from "../About"
import { Contact } from "../Contact"
import { Developers } from "../Developers"
import { Home } from "../Home"
import { Play } from "./Play"

import "../../css/pages.css"

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




function UserApp() {
    
    return (
        <div className="main_scrn">
            <div className="main_content" >
                <LeftNavBar routes={routes}/>
            </div>
        </div>
    )
}

export {UserApp}