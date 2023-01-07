import { Link, Route, Routes } from "react-router-dom"
import { NavBar } from "./Home"

function AuthOptions() {
    return (
        <div className="auth_opt_cont">
            <div className="auth_opt">
                <Link className="auth_opt_comp" to="signin">Sign in</Link>
                <Link className="auth_opt_comp" to="/signup">Sign up</Link>
            </div>
        </div>
    )
}

function SignIn() {
    return (
        <div className="auth_opt_cont">
            <div className="auth_opt">
                <input spellCheck="false" className="auth_input auth_input_user" placeholder="Username" type="text" />
                <input spellCheck="false" className="auth_input auth_input_pass" placeholder="password" type="password" />
                <button onClick={() => {}} className="auth_btn">Sign In</button>
                <Link className="auth_btn" to="/auth/signup">Sign up</Link>
            </div>
        </div>
    )
}

function SignUp() {
    return (
        <div className="auth_opt_cont">
            <div className="auth_opt">
                <input spellCheck="false" className="auth_input auth_input_user" placeholder="Username" type="text" />
                <input spellCheck="false" className="auth_input auth_input_user" placeholder="Email" type="email" />
                <input spellCheck="false" className="auth_input auth_input_pass" placeholder="Password" type="password" />
                <input spellCheck="false" className="auth_input auth_input_pass" placeholder="Confirm Password" type="password" />
                <button onClick={() => {}} className="auth_btn">Sign Up</button>
                <Link className="auth_btn" to="/auth/signin">Sign in</Link>
            </div>
        </div>
    )
}


function Auth () {
    return (
        <div className="main_scrn">
            <NavBar />
            <Routes>
                <Route path="/" element={<AuthOptions />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </div>
    )
}

export {Auth}