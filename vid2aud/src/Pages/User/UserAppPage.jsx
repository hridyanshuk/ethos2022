import { LeftNavBar } from "../../components/LeftNavBar"
import { About } from "../About"
import { Contact } from "../Contact"
import { Developers } from "../Developers"
import { Home } from "../Home"

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

function UserApp() {
    
    return (
        <div className="main_scrn">
            <div className="main_content" >
                <LeftNavBar routes={routes} />
            </div>
        </div>
    )
}

export {UserApp}