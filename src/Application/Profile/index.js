import "./index.css"
import { FaRegUserCircle } from "react-icons/fa"
import { Route, Routes, Navigate, useParams, Link, useLocation } from "react-router-dom"
import LikedSongs from "./likedSongs"
import ProfilePlaylist from "./likedPlaylist"
import ProfileFollower from "./followers"
import ProfileFollowing from "./following"
import { useState } from "react"
import * as client from "../client"
import { useEffect } from "react"
import MyPlaylist from "./myPlaylist"
import Reports from "./reports"
import Update from "./Update"
import Request from "./request"
function Profile() {
    const linklist = ["Liked Songs", "Liked Playlist", "Followers", "Followings"];
    const { pathname } = useLocation();
    const { uid } = useParams();
    const [rerender, setRerednder] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [user, setUser] = useState()
    const [follower, setFollower] = useState()
    const [following, setFollowing] = useState()

    const fetchUser = async () => {
        const response = await client.getUserInfo(uid)
        setUser(response)
        fetchFollower()
        fetchFollowing()
    }

    useEffect(() => {
        const getCurrUser = async () => {
            const response = await client.getCurrUser()
            setCurrentUser(response)
        }
        getCurrUser()
        fetchUser()
    }, [uid])
    const fetchFollower = async () => {
        const response = await client.getFollowerByUser(uid)
        setFollower(response)
    }
    const fetchFollowing = async () => {
        const response = await client.getFollowingByUser(uid)
        setFollowing(response)
    }

    const handleFollow = async (follows) => {
        await client.updateFollows(follows, uid)
        fetchFollower()
        setRerednder(true)
    }



    return (
        <>
            {user &&
                <div className="wd-profile">
                    <div className="wd-profile-header">
                        <FaRegUserCircle />
                        <h3 className="mt-2 wd-profile-user-name">{user.userName}</h3>

                        {follower && currentUser && currentUser._id !== uid &&
                            !follower.some((item) => item._id === currentUser._id) &&
                            <button className="btn btn-secondary" onClick={() => handleFollow(true)}>Follow</button>
                        }
                        {follower && currentUser && currentUser._id !== uid &&
                            follower.some((item) => item._id === currentUser._id) &&
                            <button className="btn btn-secondary" onClick={() => handleFollow(false)}>Unfollow</button>
                        }
                        <div className="d-flex wd-profile-header-followInfo">
                            {follower && <p>Followers: {follower.length}</p>}
                            {following && <p>Follwing: {following.length}</p>}
                        </div>
                    </div>
                    <div className="wd-profile-body">

                        <div className="wd-profile-main-nav">
                            <ul className="nav nav-tabs">

                                {
                                    linklist.map((item, index) => (
                                        <li key={index} className="nav-item">
                                            <Link className={`nav-link ${decodeURIComponent(pathname).includes(item) && "active"}`} to={`/Application/Profile/${uid}/${item}`}>{item}</Link>
                                        </li>
                                    ))
                                }
                                {currentUser && currentUser._id === uid && currentUser.role !== "User" &&
                                    <li className="nav-item">
                                        <Link className={`nav-link ${decodeURIComponent(pathname).includes("My Playlist") && "active"}`} to={`/Application/Profile/${uid}/My Playlist`}>My Playlist</Link>
                                    </li>}
                                {currentUser && (currentUser._id === uid || currentUser.role === "Admin") &&
                                    <li className="nav-item">
                                        <Link className={`nav-link ${decodeURIComponent(pathname).includes("Update") && "active"}`} to={`/Application/Profile/${uid}/Update`}>Update Profile</Link>
                                    </li>}
                                {currentUser && currentUser._id === uid && currentUser.role === "Admin" &&
                                    <>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${decodeURIComponent(pathname).includes("Reports") && "active"}`} to={`/Application/Profile/${uid}/Reports`}>Reports</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${decodeURIComponent(pathname).includes("Requests") && "active"}`} to={`/Application/Profile/${uid}/Requests`}>Requests</Link>
                                        </li>
                                    </>

                                }

                            </ul>
                        </div>
                        <Routes>

                            <Route path="/" element={<Navigate to={"Liked Songs"} />} />
                            <Route path="My Playlist" element={<MyPlaylist />} />
                            <Route path="Liked Songs" element={<LikedSongs />} />
                            <Route path="Reports" element={<Reports />} />
                            <Route path="Requests" element={<Request />} />
                            <Route path="Liked Playlist" element={<ProfilePlaylist />} />
                            <Route path="Followers" element={<ProfileFollower rerender={rerender} setRerender={setRerednder} />} />
                            <Route path="Followings" element={<ProfileFollowing updateProfile={fetchUser} />} />
                            <Route path="Update" element={<Update profileUpdate={fetchUser} />} />
                        </Routes>
                    </div>

                </div>
            }

        </>

    )
}

export default Profile