import "./index.css"
import playlistCover from "./cover.jpg"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as client from "../client"
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
function Playlist() {

    const [playlist, setPlaylist] = useState()
    const { pid } = useParams()
    const [user, setUser] = useState()
    const [like, setLikes] = useState()
    const fetchPlaylist = async () => {
        const response = await client.fetchPlaylistDetail(pid)
        setPlaylist(response)
    }
    const fetchUser = async () => {
        const response = await client.getCurrUser()
        fetchLikedPlaylist()
        setUser(response)
    }

    const fetchLikedPlaylist = async () => {
        const response = await client.getLikedPlaylistByUser()
        setLikes(response)
    }

    const handleLike = async (like, pid) => {
        await client.updateLikedPlaylist(like,pid)
        fetchLikedPlaylist()
        fetchPlaylist()
    }

    useEffect(() => {
        fetchPlaylist()
        fetchUser()
    }, [pid])

    return (
        <div className="wd-playlist-detail-container">
            {playlist &&
                <div className="wd-playlist-detail container">
                    <div className="wd-playlist-detail-info d-flex pt-3 ">
                        <img src={playlistCover} />
                        <div className="ms-5">
                            <h4>{playlist.name}</h4>
                            <p>Author: <Link to={`/Application/Profile/${playlist.author._id}`}>{playlist.author.userName}</Link></p>
                            <p className="mb-0">Like: {playlist.likes}</p>
                            {
                                user && like &&
                                <>
                                    {!like.some((item) => item._id === playlist._id) ?
                                        <button className="btn btn-transparent  p-0" onClick={() => handleLike(true, playlist._id)}><FcLike /></button> :
                                        <button className="btn btn-transparent p-0" onClick={() => handleLike(false, playlist._id)}><FcDislike /></button>}
                                </>
                            }
                            <h4>Description:</h4>
                            {playlist.description}
                        </div>
                    </div>

                    <hr />
                    <table className="table table-striped mt-3">
                        <tbody>
                            {playlist.newSongs && playlist.newSongs.map((item, index) => (
                                <tr key={index} className="row">
                                    <td className="col-4">
                                        <img src={item.image} alt="Song Cover" />
                                    </td>
                                    <td className="col-3">
                                        <Link to={`/Application/Songs/${item.sid}`} className="d-flex">
                                            <p className="me-5">{item.name}</p>
                                        </Link>
                                    </td>
                                    <td className="col-3">
                                        <p className="ms-2">{item.artist}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
        </div>

    )
}

export default Playlist