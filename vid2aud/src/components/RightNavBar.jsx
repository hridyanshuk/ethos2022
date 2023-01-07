import { Link, Route, Routes } from 'react-router-dom'
import '../css/rightnavbar.css'
function RightNavBar({
    orig,
    routes,
    main
}) {

    var key=0
    const routeList = routes.map(route => <li><Link className='right_navbar_link' to={orig+route.route}>{route.routeName}</Link></li>)
    // const routePageList = routes.map(route => <Route path={route.route} element={route.element} />)
    return (
        <div className="right_navbar_screen">
            <div className="right_navbar">
                <ul>
                    {routeList}
                </ul>
            </div>
            <div className="right_navbar_main">
                {main}
            </div>    
        </div>
    )
}
export {RightNavBar}