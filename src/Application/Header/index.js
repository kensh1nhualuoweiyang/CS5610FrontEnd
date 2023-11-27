import { useEffect, useState } from "react";
import "./index.css"
import logoImg from "./logo.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import * as client from "../client"
function Header() {
    const { pathname } = useLocation();
    const [keyword, setKeyword] = useState("")
    const [user, setUser] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        const getUser = async () => {
            const response = await client.getCurrUser();
            setUser(response)
        }
        getUser()
    }, [pathname])

    const handleLogOut = async () => {
        await client.logOut()
        setUser(null)
        navigate("/Application")
    }

    return (
        <div className="wd-header-body fixed-top">
            <div className="wd-header-content mt-2">
                <div className="d-flex wd-header-nav">
                    <img src={logoImg} alt="Logo" ></img>
                    <nav className="ms-3 navbar navbar-expand-lg">
                        <ul className="navbar-nav">
                            <li className="nav-item" key="home">
                                <Link className={`nav-link ${decodeURIComponent(pathname).includes("home") && "active"}`} to={"./home"}>Home</Link>
                            </li>

                            {user && <li className="nav-item" key="profile">
                                <Link className={`nav-link ${decodeURIComponent(pathname).includes("Profile") && "active"}`} to={`./Profile/${user._id}`}>My Profile</Link>
                            </li>}

                            <li className="nav-item ml-auto">
                                <div className="wd-header-end d-flex">
                                    <form className="d-flex" role="search">
                                        <input className="form-control me-2" type="search" placeholder="Search For Song, Artist, or Playlist" onChange={(e) => (setKeyword(e.target.value))} />
                                        <Link to={`/Application/Search/${keyword}`} className="btn btn-outline-dark me-2">Search</Link>
                                    </form>
                                    {user ? <button className="btn btn-outline-dark me-2" onClick={handleLogOut}>Logout</button> : <>
                                        <Link to={"/Application/Register"} className="btn btn-outline-dark me-2">Register</Link>
                                        <Link to={"/Application/Login"} className="btn btn-outline-dark me-2">Login</Link></>}
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
                <hr className="mb-0" />
            </div>
        </div>



    )
}

export default Header