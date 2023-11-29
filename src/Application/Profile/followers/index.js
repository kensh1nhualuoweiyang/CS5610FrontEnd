

import { Link, useParams } from "react-router-dom"
import "./index.css"
import { FaRegUserCircle } from "react-icons/fa"
import { useEffect, useState } from "react"
import * as client from "../../client"
function ProfileFollower({rerender,setRerender}){

    const {uid} = useParams()

    const [followers, setFollower ] = useState()

    const fetchFollowers = async () => {
        const response = await client.getFollowerByUser(uid)
        setFollower(response)
    }

    useEffect(()=>{
        fetchFollowers()
        if(rerender)
            setRerender(false) 
    },[uid,rerender])


    return(
        <div className="wd-pFollower list-group mt-4">
            {console.log(followers)}
            {

                followers && followers.map((item) => (
                    <div className="list-group-item list-group-item-action">
                        <FaRegUserCircle/>
                        <Link to={`/Application/Profile/${item._id}`} className="ms-5">{item.userName}</Link>
                    </div>
                ))
            }   
        </div>
    )

}

export default ProfileFollower