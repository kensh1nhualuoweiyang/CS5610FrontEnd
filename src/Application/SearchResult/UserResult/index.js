import { Link } from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa"
import "./index.css"
function UserResult() {
    const exampleUser = ["User1", "User 2", "User3"]
    return (
        <div className="wd-search-user-result">
            <ul className="list-group">
                {
                    exampleUser.map((item) => (
                        <div className="list-group-item list-group-item-action">


                            <Link id="user" to={`/Application/Profile/${item}`} className="ms-5">
                                <FaRegUserCircle className="me-5" />
                                <span>{item}</span>
                                
                            </Link>
                        </div>

                    ))
                }

            </ul>
        </div>
    )
}

export default UserResult