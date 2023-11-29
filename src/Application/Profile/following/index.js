


import { Link, useParams } from "react-router-dom"
import "./index.css"
import { FaRegUserCircle } from "react-icons/fa"
import { useEffect, useState } from "react"
import * as client from "../../client"
function ProfileFollowing({updateProfile}) {

    const {uid} = useParams()
    const [user,setUser] = useState()
    const [following, setFollowing] = useState()
    
    const fetchFollowing = async () => {
        const response = await client.getFollowingByUser(uid)
        setFollowing(response)
    }
    const fetchUser = async () => {
        const response = await client.getCurrUser()
        setUser(response)
    }

    const handleUnFollow = async (id) => {
        await client.updateFollows(false,id)
        fetchFollowing()
        updateProfile()
    }

    useEffect(() => {
        fetchUser()
        fetchFollowing()
    },[uid])


    return (
        <div className="wd-pFollowing list-group mt-4">
            {
                following && following.map((item) => (
                    <div className="list-group-item list-group-item-action">
                        <FaRegUserCircle />
                        {console.log(item)}
                        <Link to={`/Application/Profile/${item._id}`} className="ms-5">{item.userName}</Link>
                        <div className="float-end">
                            <button className="btn btn-danger" onClick={() => handleUnFollow(item._id)}>Unfollow</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )

}

export default ProfileFollowing