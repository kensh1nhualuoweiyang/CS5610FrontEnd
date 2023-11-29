import { Link, useParams } from "react-router-dom";
import "./index.css"
import { useEffect } from "react";
import * as  client from "../../client"
import { useState } from "react";
import { FcDislike } from "react-icons/fc";
function ProfilePlaylist() {
    const { uid } = useParams()
    const [playList, setPlaylist] = useState()
    const [user, setUser] = useState()
    useEffect(() => {
        const fetchPlaylist = async () => {
            const response = await client.getLikedPlaylistByUser(uid)
            setPlaylist(response)
        }
        const fetchUser = async () => {
            const response = await client.getCurrUser()
            setUser(response)
        }
        fetchUser()
        fetchPlaylist()
    }, [uid])

    const handleDislike = async (pid) => {
        await client.updateLikedPlaylist(false, pid)
        const newPlaylist = playList.filter((item) => item._id !== pid)
        setPlaylist(newPlaylist)
    }

    return (
        <div className="container mt-3">
            <div className="list-group">
                {console.log(playList)}
                {
                    playList &&
                    <>
                        {
                            playList.length === 0 ? (
                                <h3 className="me-4">No Playlist Found</h3>
                            ) : (
                                playList.map((item, index) => (
                                    <div key={index} className="list-group-item list-group-item-action">
                                        <Link className="wd-profile-playlist" key={item} to={`/Application/Playlist/${item._id}`} >
                                            {item.name}
                                        </Link>
                                        {user && user._id === uid && <div className="float-end">
                                            <button className="btn btn-transparent" onClick={() => handleDislike(item._id)}><FcDislike /></button>
                                        </div>}
                                    </div>
                                ))
                            )
                        }
                    </>
                }
            </div>
        </div>
    );
}
export default ProfilePlaylist