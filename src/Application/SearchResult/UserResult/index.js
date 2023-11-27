import { Link, useParams } from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa"
import "./index.css"
import * as client from "../../client"
import { useState } from "react"
import { useEffect } from "react"
function UserResult() {
    const [users, setUsers] = useState([])
    const { keyword } = useParams()
    useEffect(() => {

        const searchUser = async () => { 
            const response = await client.searchUsers(keyword) 
            setUsers(response)
        }
        searchUser()
    }, [keyword])
    return (
        <div className="wd-search-user-result">
            <ul className="list-group">
                {    
                      users && users.map((item) => (
                        <div className="list-group-item list-group-item-action">
                            <Link id="user" to={`/Application/Profile/${item._id}`} className="ms-5">
                                <FaRegUserCircle className="me-5" />
                                <span>{item.userName}</span>
                            </Link>
                        </div>

                    ))
                }

            </ul>
        </div>
    )
}

export default UserResult