import { Link } from "react-router-dom"
import "./index.css"
import { useState } from "react"
function Login() {
    let errorMsg = "Invalid Username/Password Combination"
    const {username, setUsername} = useState("")
    const {password, setPass} = useState("")
    return (
        <div className="wd-login-content" >
            <p className="wd-login-error-msg">{errorMsg}</p>
            <div className="wd-login-form">
                <h4>Login</h4>
                <label for="username" className="form-label mt-4">Username</label>
                <input type="username" id="password" className="form-control" onChange={(e) => (setUsername(e.target.value))}/>
                <label for="loginPassword" className="form-label mt-4">Password</label>
                <input type="password" id="loginPassword" className="form-control" onChange={(e) => (setPass(e.target.value))} />
                <button type="submit" className="btn btn-secondary mt-3 mb-3 me-3">Login</button>
                <Link to="/Application/Home" className="btn btn-secondary mt-3 mb-3">Cancel</Link>
            </div>
        </div>
    )

}

export default Login