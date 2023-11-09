


import { Link } from "react-router-dom"
import "./index.css"
import { FaRegUserCircle } from "react-icons/fa"
function ProfileFollowing() {
    const sameple = ["name1", "name2", "name3"]
    return (
        <div className="wd-pFollowing list-group mt-4">
            {
                sameple.map((item) => (
                    <div className="list-group-item list-group-item-action">
                        <FaRegUserCircle />
                        <Link to={`/Application/Profile/${item}`} className="ms-5">{item}</Link>
                        <div className="float-end">
                            <button className="btn btn-danger">Unfollow</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )

}

export default ProfileFollowing