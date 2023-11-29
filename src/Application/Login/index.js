import { Link, useNavigate } from "react-router-dom"
import "./index.css"
import { useState } from "react"
import * as client from "../client"
function Login() {
    const navigate = useNavigate()
    const [err, setErr] = useState()
    const [credentials, setCredentials] = useState({
        userName:"",
        password:""
    })
    const handleLogin = async () =>{
        try{
            const response=await client.login(credentials)
            navigate(`/Application/Profile/${response._id}`)
        }
        catch(err){
            setErr(err.response.data.message);
        }
    }
   
    return (
        <div className="wd-login-content" >
            {err && <p className="alert alert-danger">{err}</p>}
            <div className="wd-login-form">
                <h4>Login</h4>
                <label for="username" className="form-label mt-4">Username</label>
                <input id="password" className="form-control" value={credentials.userName} onChange={(e) => setCredentials({...credentials, userName:e.target.value})} />
                <label for="loginPassword" className="form-label mt-4">Password</label>
                <input id="loginPassword" className="form-control" value={credentials.password} onChange={(e) => setCredentials({...credentials, password:e.target.value})} />
                <button className="btn btn-secondary mt-3 mb-3 me-3" onClick={handleLogin}>Login</button>
                <Link to="/Application/Home" className="btn btn-secondary mt-3 mb-3">Cancel</Link>
            </div>
        </div>
    )

}

export default Login