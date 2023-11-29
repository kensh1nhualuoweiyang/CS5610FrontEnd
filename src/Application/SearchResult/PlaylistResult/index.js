import { Link, useParams } from "react-router-dom"
import cover from "./cover.jpg"
import "./index.css"
import { useState } from "react"
import { useEffect } from "react"
import * as client from "../../client"
function PlaylistResult() {
    
    const {keyword} = useParams()
    const [playList,setPlaylist] = useState()
    const fetchPlaylist = async () =>{
        const response = await client.fetchPlaylistSearch(keyword)
        setPlaylist(response)
    }

    useEffect(() => {
        fetchPlaylist()
    },[keyword])



    return (
        <div className="wd-playlist-result">
            <ul className="list-group">
                {
                    playList && playList.map((item) => (
                        <li className="list-group-item list-group-item-action">
                            <img src={cover} />
                            <Link to={`/Application/Playlist/${item._id}`} className="ms-5 me-5">{item.name}</Link>
                            <Link to={`/Application/Profile/${item.author._id}`} className="ms-5 me-5">{item.author.userName}</Link>
                            <span className="me-5">Likes : {item.likes}</span>
                         
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}

export default PlaylistResult