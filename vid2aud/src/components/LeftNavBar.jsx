import { Link, Route, Routes, useLocation } from 'react-router-dom'
import '../css/leftnavbar.css'
import { Play } from '../Pages/User/Play'
import { Video } from '../Pages/User/Video'
import { RightNavBar } from './RightNavBar'



function LeftNavBar({
    routes
}) {
    var key=0
    const routeList = routes.map(route => <li key={key++}><Link className='left_navbar_link' to={route.route}>{route.routeName}</Link></li>)
    // const innerRouteList = innerRoutes.map(route => <li><Link className='left_navbar_link' to={route.route}>{route.routeName}</Link></li>)
    // const routePageList = innerRoutes.map(route => <Route path={route.route} element={route.element} />)

        
    var rightRoutes=[]
    rightRoutes.push({
        routeName: "Video",
        route: "/",
        element: <Play />
    })
    rightRoutes.push({
        routeName: "Collection",
        route: "/collection",
        element: <>Collection</>
    })
    rightRoutes.push({
        routeName: "Play",
        route: "/play",
        element: <>Play</>
    })
    
    const location = useLocation()

    return (
        <div className="left_navbar_screen">
            <div className="left_navbar">
                <ul>
                    {routeList}
                </ul>
            </div>
            <div className="left_navbar_main">
                <Routes>
                    <Route path='/' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<Video />} />} />
                    <Route path='/:userid' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<Video />} />} />
                    <Route path='/:userid/:vidid' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<Video />} />} />
                    
                    <Route path='/collection' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<>Collection</>} />} />
                    <Route path='/:userid/collection' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<>Collection</>} />} />
                    
                    <Route path='/play' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<>Play</>} />} />
                    <Route path='/:userid/play' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<>Play</>} />} />
                    <Route path='/:userid/:vidid/play' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<>Play</>} />} />
                </Routes>
            </div>    
        </div>
    )
}
export {LeftNavBar}