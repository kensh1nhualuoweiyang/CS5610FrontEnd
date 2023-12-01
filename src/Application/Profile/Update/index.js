import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router"
import * as client from "../../client"

function Update({ profileUpdate }) {


    const [user, setUser] = useState()
    const [newUser, setNewUser] = useState()
    const { uid } = useParams()
    const [currUser, setCurrUser] = useState()
    const [role, setRole] = useState()
    const roles = ["User", "Admin", "Creator"]
    const [requestResponse, setResponse] = useState("")
    const fetchCurrUser = async () => {
        const response = await client.getCurrUser()
        setCurrUser(response)
    }
    const fetchUser = async () => {
        const response = await client.getUserInfo(uid)
        setUser(response)
        setRole(response.role)
        setNewUser({ ...response, userName: "", password: "", email: "" })
    }
    const [err, setErr] = useState("")
    useEffect(() => {
        fetchUser()
        fetchCurrUser()
        setResponse()
    }, [uid])

    const handleUpdate = async () => {
        try {
            await client.updateProfile(newUser)
            setUser(newUser)
            setNewUser({ ...newUser, userName: "", password: "", email: "" })
            setErr("")
            profileUpdate()
        }
        catch (err) {
            setErr(err.response.data.message)
        }
    }

    const handleRoleRequest = async () => {
        try{
            await client.requestRole(uid,role)
            setResponse("Your Request Is Being Send and Processed")
        }
        catch(err){
            setResponse(err.response.data.message)
        }
    }

    return (
        <div>
            {err && <div className="alert alert-warning mt-2">{err}</div>}
            {user && currUser && (user._id === uid || (currUser && currUser.role === "Admin")) &&
                <>
                    <form class="form-floating mt-3 w-50">
                        <input class="form-control" id="email" placeholder="name@example.com" value={user.email} />
                        <label for="email">Profile Email</label>
                    </form>
                    <form class="form-floating mt-2 w-50">
                        <input class="form-control" id="username" value={user.userName} />
                        <label for="username">Profile User Name</label>
                    </form>
                    <form class="form-floating mt-2 w-50">
                        <input type="email" class="form-control" id="password" value={user.password} />
                        <label for="password">Profile User Password</label>
                    </form>
                    <div class="form-floating mt-3 w-50">
                        <input type="email" class="form-control" id="newEmail" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                        <label for="newEmail">Desired Email</label>
                    </div>
                    <div class="form-floating mt-1 w-50">
                        <input class="form-control" id="newUserName" value={newUser.userName} onChange={e => setNewUser({ ...newUser, userName: e.target.value })} />
                        <label for="newUserName">Desired Username</label>
                    </div>
                    <div class="form-floating mt-1 w-50">
                        <input class="form-control" id="newPass" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                        <label for="newPass">Desired Password</label>
                    </div>
                    {currUser && currUser.role === "Admin" &&

                        <div>
                            <label className="mt-2" for="userGroup">Modify User Group:</label>
                            <select id="userGroup" class="form-select w-25" aria-label="userGroup"
                                onChange={(e) => {
                                    setNewUser({ ...newUser, role: e.target.value });
                                }}>
                                {roles.map((item) => {
                                    return (<option className={item === user.role && "selected"} value={item}>{item}</option>)
                                })}
                            </select>
                        </div>
                    }
                    <button className="btn btn-secondary mt-2 mb-4" onClick={handleUpdate}>Update Change</button>
                    {requestResponse && <div className="alert alert-secondary mt-2 w-50">{requestResponse}</div>}
                    {user.role !== "Admin" && user._id === currUser._id &&
                        
                        <div>
                            <label className="mt-0" for="groupRequest">Request Role Change:</label>
                            <select id="groupRequest" class="form-select w-25" aria-label="groupRequest"
                                onChange={(e) => {
                                    setRole(e.target.value);
                                }}>
                                {roles.map((item) => {
                                    return (<option className={item === user.role && "selected"} value={item}>{item}</option>)
                                })}
                            </select>
                            <button className="btn btn-warning  mt-2 mb-2" onClick={handleRoleRequest}>Send Request</button>
                            
                        </div>
                    }

                </>
            }


        </div>
    )
}

export default Update