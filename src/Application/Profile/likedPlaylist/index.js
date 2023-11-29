import { Link, useParams } from "react-router-dom";
import "./index.css"
import { useEffect } from "react";
import * as  client from "../../client"
import { useState } from "react";
function ProfilePlaylist() {
    const {uid} = useParams()
    const [playList, setPlaylist] = useState([])

    useEffect(() => {
        const fetchPlaylist = async () =>{
            const response = await client.getLikedPlaylistByUser(uid)
            setPlaylist(response)
        }
        fetchPlaylist()
    },[uid])


    return (
        <div className="container mt-3">
            <div className="list-group">
                {
                    playList && playList.length === 0 ? (
                        <h3 className="me-4">No Playlist Found</h3>
                    ) : (
                        playList.map((item, index) => (
                            <div key={index} className="list-group-item list-group-item-action">
                                <Link className="wd-profile-playlist" key={item} to={`/Application/Playlist/${item._id}`} >
                                    {item.name}
                                </Link>
                                <div className="float-end">
                                    <Link className="btn btn-primary me-3">Edit</Link>
                                    <button className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
            </div>
        </div>
    );
}
export default ProfilePlaylist