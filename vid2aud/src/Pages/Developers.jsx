import { NavBar } from "./Home"

function Developers() {
    return (
        <div className="main_scrn">
            <NavBar />
            <div className="main_content" >
                <div className="about_pg">
                    <h1>Developers</h1>
                    <br />
                    <h2>Created by</h2>
                    This application was created by Team M, participating in Ethos IIT Guwahati.
                    <br />
                    <br />
                    <h2>Team M:</h2>
                    <ul>
                        <li>
                            Hridyanshu Kumar
                        </li>
                    </ul>
                    <h2>GitHub Links</h2>
                    <ul>
                        <li><a style={{
                            color: "white"
                        }} href="https://github.com/hridyanshuk">Hridyanshu Kumar (hridyanshuk)</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export {Developers}