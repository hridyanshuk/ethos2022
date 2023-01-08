import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { NavBar } from "./Home"

import Cookies from "js-cookie"

import "../css/pages/auth.css"
import { useEffect, useRef } from "react"
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

async function signinAPI(
    userNameRef,
    passRef
) {
    const usernameE = userNameRef.current
    const passE = passRef.current

    const username = usernameE.value
    const password = passE.value

    var errors = false

    if(username.split(" ").length > 1 || username.length === 0) {
        errors=true
        userNameRef.current.style.border="1.5px solid red"
    }
    else {
        userNameRef.current.style.border="none"
    }

    if(password.length === 0) {
        errors=true
        passRef.current.style.border= "1.5px solid red"
    }
    else {
        passRef.current.style.border= "none"
    }

    if(errors) return

    const response = await axios.post('/signin', {
        username: username,
        password: password
    })
    .then(response => {
        if(response.data.errorCode) {
            return {
                errorCode: response.data.errorCode,
                error: response.data.error
            }
        }
        console.log(response.data)
        Cookies.set('token', response.data.token, {
            expires: response.data.expiresIn
        })
        return {
            username: response.data.username,
            _id: response.data._id
        }
    })
    console.log(response)
    return response
}

function SignIn() {
    const userNameRef = useRef()
    const passRef = useRef()

    const navigate = useNavigate()

    return (
        <div className="auth_opt_cont">
            <div className="auth_opt">
                <input ref={userNameRef} spellCheck="false" className="auth_input auth_input_user" placeholder="Username" type="text" />
                <input ref={passRef} spellCheck="false" className="auth_input auth_input_pass" placeholder="password" type="password" />
                <button onClick={async () => {
                    const signInRes = await signinAPI(
                        userNameRef,
                        passRef
                    )
                    console.log("Sign in response", signInRes)
                    if(signInRes.errorCode) {

                    }
                    else {
                        navigate(`/main/${signInRes._id}`)
                    }
                }} className="auth_btn">Sign In</button>
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

    if(errors) return

    const response = await axios.post('/signup',{
        name: name,
        username: username,
        email: email,
        password: password
    })
    .then(response => {
        
        if(response.data.errorCode) {
            return {
                errorCode: response.data.errorCode,
                error: response.data.error
            }
        }
        Cookies.set('token', response.data.token, {
            expires: response.data.expiresIn
        })
        return {
            username: response.data.username,
            _id: response.data._id
        }
        // Cookies.set('token', response.data.token, {
        //     expires: response.data.expiresIn
        // })
        
    })
    return response
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
                <button onClick={async () => {
                    const signInRes = await signupAPI(
                        nameRef,
                        userNameRef,
                        emailRef,
                        passRef,
                        confirmRef
                    )

                    console.log(signInRes)

                    if(signInRes.errorCode) {

                    }
                    else {
                        navigate(`/main/${signInRes._id}`)
                    }
                
                }} className="auth_btn">Sign Up</button>
                <Link className="auth_btn" to="/auth/signin">Sign in</Link>
            </div>
        </div>
    )
}


function Auth () {

    const navigate = useNavigate()

    useEffect(() => {
        
        (async function() {
            const token = Cookies.get('token')
            const auth = Cookies.get('auth')
            if(auth && auth.authenticated) {
                navigate(`/main/${auth._id}`)
            }
            if(token) {
                const config = configInstance()
                const authResponse = await axios.get(
                    '/authenticate',
                    config
                )
                .then(response => response.data)
                console.log(authResponse)
                if(authResponse.authenticated) {
                    Cookies.set('auth', true)
                    Cookies.set('_id', authResponse._id)
                    navigate(`/main/${authResponse._id}`)
                }
            }
        })()
            
        return
    }, [])

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