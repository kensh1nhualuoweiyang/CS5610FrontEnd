import { Link, useParams } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";
import * as client from "../../client"
import "./index.css"
function Request() {

    const { uid } = useParams()
    const [request, setRequests] = useState()
    const fetchRequest = async () => {
        const response = await client.fetchRequest()
        setRequests(response)
    }
    useEffect(() => {
        fetchRequest()
    }, [uid])

    const handleRoleRequest = async (accept,id,user,role) => {
        await client.processRequest(accept,id,user,role)
        await fetchRequest()
    }

    return (
        <div className="container mt-3">
            <div className="list-group mb-5">
                {
                    request &&
                    <>
                        {
                            request.length === 0 ? (
                                <>
                                    <h3 className="me-4">No Requests Unresolved</h3>
                                </>

                            ) : (
                                request.map((item, index) => (
                                    <div key={index} className="list-group-item list-group-item-action">
                                        User: <Link className="wd-profile-request" to={`/Application/Profile/${item.uid._id}`}>{item.uid.userName}</Link>
                                        <span className="ms-5">Requested Role: {item.role}</span>
                                       
                                        <div className="float-end">
                                            <button className="btn btn-secondary me-3" onClick={() => handleRoleRequest(false,item._id,item.uid._id,item.role)}>Deny</button>
                                            <button className="btn btn-success" onClick={() => handleRoleRequest(true,item._id,item.uid._id,item.role)} >Accept</button>
                                        </div>
                                        
                                    </div>
                                ))
                            )
                        }
                    </>
                }
            </div>
           
        </div>
    );
}
export default Request