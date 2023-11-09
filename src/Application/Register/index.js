import { Link } from "react-router-dom"
import "./index.css"
import { useState } from "react"
function Register() {
    const errorMsg = "Duplicate Username Found, Please Chose another user name"
    const {userName, setUsername} = useState("")
    const {pass, setPass} = useState("")
    const {email,setEmail} = useState("")
    return (
        <div className="wd-register-content " >
            <p className="wd-register-error-msg">{errorMsg }</p>
            <div className="wd-register-form ">
                <h4>Register</h4>
                <label for="username" className="form-label mt-4">Username</label>
                <input type="username" id="password" className="form-control" onChange={(e)=>(setUsername(e.target.value))}/>
                <label for="regiPassword" className="form-label mt-4">Password</label>
                <input type="password" id="regiPassword" className="form-control" onChange={(e)=>(setPass(e.target.value))} />
                <label for="email" className="form-label mt-4">Email</label>
                <input type="email" id="email" className="form-control" onChange={(e)=>(setEmail(e.target.value))}/>
                <button type="submit" className="btn btn-secondary mt-3 mb-3 me-3">Register</button>
                <Link to="/Application/Home" className="btn btn-secondary mt-3 mb-3">Cancel</Link>
            </div>
        </div>


    )
}

export default Register