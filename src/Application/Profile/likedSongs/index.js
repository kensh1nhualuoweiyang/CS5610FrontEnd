import { Link, useParams } from "react-router-dom"
import "./index.css"
import { FcDislike } from "react-icons/fc";
import { useState } from "react";
import { useEffect } from "react";
import * as client from "../../client"
function LikedSongs() {
    const { uid } = useParams();
    const [user, setUser] = useState()
    const [songs, setSongs] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const response = await client.getCurrUser()
            setUser(response)
        }
        fetchUser()
        fetchLikedSong()
    }, [uid])

    const fetchLikedSong = async () => {
        const response = await client.getLikedSongByUser(uid)
        setSongs(response)
    }

    const handleDislike = async (sid) => {
        await client.handleLikeSong(false, sid, uid)
        fetchLikedSong()
    }

    return (
        <div className="container mt-3">
            <div className="list-group">
                {
                    songs &&
                    <>
                        {
                            songs.length === 0 ? (
                                <div className="d-flex">
                                    <h3 className="me-4">No Songs Liked</h3>
                                </div>

                            ) : (
                                songs.map((item) => (
                                    <div key={item._id} className="list-group-item list-group-item-action">
                                        <Link className="wd-profile-songs" key={item._id} to={`/Application/Songs/${item.sid}`} >
                                            <img src={item.image} className="me-5" />
                                            {item.name}
                                        </Link>
                                        {user && user._id === uid &&
                                            <div className="float-end">
                                                <button className="btn btn-transparent" onClick={() => handleDislike(item._id)}><FcDislike /></button>
                                            </div>
                                        }
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

export default LikedSongs;
