import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { NavBar } from "./Home"

import Cookies from "js-cookie"

import "../css/pages/auth.css"
import { useRef } from "react"
import {configInstance, getHeaders, instance as axios} from "../axios_stuff"

function AuthOptions() {
    return (
        <div className="auth_opt_cont">
            <div className="auth_opt">
                <Link className="auth_opt_comp" to="/auth/signin">Sign in</Link>
                <Link className="auth_opt_comp" to="/auth/signup">Sign up</Link>
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

async function signupAPI(
    nameRef,
    userNameRef,
    emailRef,
    passRef,
    confirmRef,
    navigate
) {
    var usernameE = userNameRef.current
    var emailE = emailRef.current
    var passwordE = passRef.current
    var confirmPassE = confirmRef.current

    const name = nameRef.current.value
    const username = userNameRef.current.value
    const email = emailRef.current.value
    const password = passRef.current.value
    const confirmPass = confirmRef.current.value

    var errors = false

    if(confirmPass !== password || password.length === 0) {
        errors=true
        passRef.current.style.border= "1.5px solid red"
        confirmRef.current.style.border= "1.5px solid red"
    }
    else {
        passRef.current.style.border= "none"
        confirmRef.current.style.border= "none"
    }

    if(username.split(" ").length > 1 || username.length === 0) {
        errors=true
        console.log("Username has spaces")
        userNameRef.current.style.border="1.5px solid red"
    }
    else {
        userNameRef.current.style.border="none"
    }

    if(email.split(" ").length > 1 || email.length === 0) {
        errors=true
        console.log("Email has spaces")
        emailRef.current.style.border="1.5px solid red"
    }
    else {
        emailRef.current.style.border="none"
    }

    await axios.post('/signup',{
        name: name,
        username: username,
        email: email,
        password: password
    })
    .then(response => {
        Cookies.set('token', response.data.token, {
            expires: response.data.expiresIn
        })
        
        console.log(response.data, response)
    })
}

function SignUp() {
    const nameRef = useRef()
    const userNameRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()
    const confirmRef = useRef()
    const navigate = useNavigate()
    return (
        <div className="auth_opt_cont">
            <div className="auth_opt">
                <input ref={nameRef} spellCheck="false" className="auth_input" placeholder="Full Name" type="text" />
                <input ref={userNameRef} spellCheck="false" className="auth_input auth_input_user" placeholder="Username" type="text" />
                <input ref={emailRef} spellCheck="false" className="auth_input auth_input_user" placeholder="Email" type="email" />
                <input ref={passRef} spellCheck="false" className="auth_input auth_input_pass" placeholder="Password" type="password" />
                <input ref={confirmRef} spellCheck="false" className="auth_input auth_input_pass" placeholder="Confirm Password" type="password" />
                <button onClick={() => {signupAPI(
                    nameRef,
                    userNameRef,
                    emailRef,
                    passRef,
                    confirmRef,
                    navigate
                )}} className="auth_btn">Sign Up</button>
                <Link className="auth_btn" to="/auth/signin">Sign in</Link>
            </div>
        </div>
    )
}


function Auth () {
    return (
        <div className="main_scrn">
            <div className="main_content">
                <NavBar />
                <Routes>
                    <Route path="/" element={<AuthOptions />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
            </div>
        </div>
    )
}

export {Auth}