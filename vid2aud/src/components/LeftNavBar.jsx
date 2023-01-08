import { useEffect } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../actions/authCheck'
import '../css/leftnavbar.css'
import { Dashboard } from '../Pages/User/Dashboard'
import { Play } from '../Pages/User/Play'
import { Video } from '../Pages/User/Video'
import { RightNavBar } from './RightNavBar'



function LeftNavBar({
    routes
}) {
    const navigate = useNavigate()

    useEffect(() => {
        const logged = isAuthenticated()
        if(!logged) {
            navigate('/auth')
        }
    }, [])


    var key=0
    const routeList = routes.map(route => <li key={key++}><Link className='left_navbar_link' onClick={() => route.onClick()} to={route.route}>{route.routeName}</Link></li>)
    // const innerRouteList = innerRoutes.map(route => <li><Link className='left_navbar_link' to={route.route}>{route.routeName}</Link></li>)
    // const routePageList = innerRoutes.map(route => <Route path={route.route} element={route.element} />)

        
    var rightRoutes=[]
    rightRoutes.push({
        routeName: "Dashboard",
        route: "/3424",
        element: <Play />
    })
    rightRoutes.push({
        routeName: "Collection",
        route: "/2234/collection",
        element: <>Collection</>
    })
    rightRoutes.push({
        routeName: "Play",
        route: "/play",
        element: <>Play</>
    })
    console.log(routeList)
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
                    {/* <Route path='/' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<Video />} />} /> */}
                    {/* <Route path='/:userid' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<Dashboard />} />} />
                    <Route path='/:userid/video/:vidid' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<Video />} />} />
                    <Route path='/:userid/collection' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<>Collection</>} />} />
                    <Route path='/:userid/:vidid/play' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<>Play</>} />} /> */}
                    {/* <Route path='' element={<RightNavBar orig={"/main"} routes={rightRoutes} main={<Dashboard />} />} /> */}
                    <Route path='/video/:vidid' element={<RightNavBar orig={"/main"} routes={[]} main={<Video />} />} />
                    <Route path='/collection' element={<RightNavBar orig={"/main"} routes={[]} main={<>Collection</>} />} />
                    <Route path='/play/:vidid' element={<RightNavBar orig={"/main"} routes={[]} main={<Play />} />} />
                
                </Routes>
            </div>    
        </div>
    )
}
export {LeftNavBar}