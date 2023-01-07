import { Link, Route, Routes } from 'react-router-dom'
import '../css/leftnavbar.css'
function LeftNavBar({
    routes
}) {

    const routeList = routes.map(route => <li><Link className='left_navbar_link' to={route.route}>{route.routeName}</Link></li>)
    const routePageList = routes.map(route => <Route path={route.route} element={route.element} />)
    return (
        <div className="left_navbar_screen">
            <div className="left_navbar">
                <ul>
                    {routeList}
                </ul>
            </div>
            <div className="left_navbar_main">
                <Routes>
                    
                </Routes>
            </div>    
        </div>
    )
}
export {LeftNavBar}