import { Link, useLocation, useNavigate } from "react-router-dom"
import "./index.css"
import { useState } from "react"
import * as client from "../client"
function Register() {
    const [error, setError] = useState()
    const [account, setAccount] = useState({
        userName: "",
        password: "",
        email: "",
        role: "User"
    })
    const navigate = useNavigate()
    const handleRegister = async () => {
        try {
            await client.register(account)
            navigate("/Application/Login")
        }
        catch (err) {
            setError(err.response.data.message);
        }
    }
   
    return (
        <div className="wd-register-content " >
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="wd-register-form ">
                <h4>Register</h4>
                <label for="username" className="form-label mt-4">Username</label>
                <input id="username" className="form-control" value={account.userName} onChange={(e) => (setAccount({ ...account, userName: e.target.value }))} />
                <label for="regiPassword" className="form-label mt-4">Password</label>
                <input id="regiPassword" className="form-control" value={account.password} onChange={(e) => (setAccount({ ...account, password: e.target.value }))} />
                <label for="email" className="form-label mt-4">Email</label>
                <input id="email" className="form-control" onChange={(e) => (setAccount({ ...account, email: e.target.value }))} />
                <label for="role" className="form-label mt-4">Role</label>
                <select className="form-select" id="role" value={account.role} onChange={(e) => (setAccount({ ...account, role: e.target.value }))}>
                    <option value={"User"}>User</option>
                    <option value={"Creator"}>Creator</option>
                </select>
                <button className="btn btn-secondary mt-3 mb-3 me-3" onClick={handleRegister}>Register</button>
                <Link to="/Application/Home" className="btn btn-secondary mt-3 mb-3">Cancel</Link>
            </div>
        </div>


    )
}

export default Register