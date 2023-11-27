import "./index.css"
import { FaRegUserCircle } from "react-icons/fa"
import { Route, Routes, Navigate, useParams, Link, useLocation } from "react-router-dom"
import ProfileSongs from "./profileSongs"
import ProfilePlaylist from "./playlist"
import ProfileFollower from "./followers"
import ProfileFollowing from "./following"
import { useState } from "react"
import * as client from "../client"
import { useEffect } from "react"
function Profile() {
    const linklist = ["Liked Songs", "Liked Playlist", "Followers", "Followings"];
    const { pathname } = useLocation();
    const { uid } = useParams();
    const [currentUser, setCurrentUser] = useState()
    const [user, setUser] = useState()
    useEffect(() => {
        const getCurrUser = async () => {
            const response = await client.getCurrUser()
            setCurrentUser(response)
        }
        const getUser = async () => {
            const response = await client.getUserInfo(uid)
            setUser(response)
        }
        getCurrUser()
        getUser()
    }, [uid])
    return (
        <>
            {user &&
                <div className="wd-profile">
                    {console.log(user)}
                    {console.log(currentUser)}
                    <div className="wd-profile-header">
                        <FaRegUserCircle />
                        <h3 className="mt-2 wd-profile-user-name">{user.userName}</h3>
                        <button className="btn btn-secondary">Follow</button>
                        <div className="d-flex wd-profile-header-followInfo">
                            <p>Followers: 0</p>
                            <p>Follwing: 0</p>
                        </div>
                    </div>
                    <div className="wd-profile-body">

                        <div className="wd-profile-main-nav">
                            <ul className="nav nav-tabs">
                                {
                                    linklist.map((item, index) => (
                                        <li className="nav-item">
                                            <Link className={`nav-link ${decodeURIComponent(pathname).includes(item) && "active"}`} to={`/Application/Profile/${uid}/${item}`}>{item}</Link>
                                        </li>
                                    ))

                                }
                            </ul>
                        </div>
                        <Routes>
                            <Route path="/" element={<Navigate to={"Liked Songs"} />} />
                            <Route path="Liked Songs" element={<ProfileSongs />} />
                            <Route path="Liked Playlist" element={<ProfilePlaylist />} />
                            <Route path="Followers" element={<ProfileFollower />} />
                            <Route path="Followings" element={<ProfileFollowing />} />
                        </Routes>
                    </div>

                </div>
            }

        </>

    )
}

export default Profile