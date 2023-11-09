

import { Link } from "react-router-dom"
import "./index.css"
import { FaRegUserCircle } from "react-icons/fa"
function ProfileFollower(){
    const sameple = ["name1","name2","name3"]
    return(
        <div className="wd-pFollower list-group mt-4">
            {
                sameple.map((item) => (
                    <div className="list-group-item list-group-item-action">
                        <FaRegUserCircle/>
                        <Link to={`/Application/Profile/${item}`} className="ms-5">{item}</Link>
                    </div>
                ))
            }   
        </div>
    )

}

export default ProfileFollower