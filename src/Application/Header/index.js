import { useState } from "react";
import "./index.css"
import logoImg from "./logo.png"
import { Link, useLocation } from "react-router-dom"
function Header() {
    const { pathname } = useLocation();
    const [keyword, setKeyword] = useState("")

    const subNav = ["Rock", "Pop", "R&B Hip-Hop", "Latin", "Country", "Classical", "EDM", "Jazz"]
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

                            <li className="nav-item" key="profile">
                                <Link className={`nav-link ${decodeURIComponent(pathname).includes("Profile") && "active"}`} to={"./Profile/123"}>My Profile</Link>
                            </li>

                            <li className="nav-item ml-auto">
                                <div className="wd-header-end d-flex">
                                    <form className="d-flex" role="search">
                                        <input className="form-control me-2" type="search" placeholder="Search For Song, Artist, or Playlist" onChange={(e) => (setKeyword(e.target.value))} />
                                        <Link to={`/Application/Search/${keyword}`} className="btn btn-outline-dark me-2" type="submit">Search</Link>
                                    </form>
                                    <Link to={"/Application/Register"} className="btn btn-outline-dark me-2">Register</Link>
                                    <Link to={"/Application/Login"} className="btn btn-outline-dark me-2">Login</Link>

                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
                <hr className="mb-0" />

                <nav className="wd-header-sub-nav navbar navbar-expand-sm">
                    <ul className="navbar-nav">
                        {
                            subNav.map((item) => (
                                <li className="nav-item" key={item}>
                                    <Link className="nav-link me-2" to={`Genre/${item}`}>{item}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </div>



    )
}

export default Header