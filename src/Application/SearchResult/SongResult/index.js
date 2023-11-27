
import "./index.css"

import cover from "./cover.jpg"
import { Link, useLocation, useParams } from "react-router-dom"
import * as client from "../../client"
import { useState } from "react"
import { useEffect } from "react"
function SongResult() {
    const [songs,setSongs] = useState(null)
    const {pathname} = useLocation()
    const {keyword} = useParams()
    useEffect(() => {
        const getSongResult = async () =>{
            const data = await client.searchSongs(keyword)
            setSongs(data.data)
        }
        getSongResult()
    },[pathname])
    const examplePlaylist = []
    return (
        <div className="wd-song-result">
            <ul className="list-group">
                {
                    songs && songs.map((item) => (
                        <li className="list-group-item list-group-item-action">
                            <img src={item.album.cover} />
                            <Link to={`/Application/Songs/${item.id}`} className="ms-5 me-5">{item.title}</Link>
                            
                            <div className="btn-group ms-5 float-end">
                            
                                <button className="btn btn-secondary dropdown-toggle ms-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Add to Playlist
                                </button>
                                <ul className="dropdown-menu">
                                    {
                                        examplePlaylist.length >= 1 ?
                                        examplePlaylist.map((item) => (
                                            <li><button type="button" className="dropdown-item" >{item}</button></li>
                                        )):
                                        <li className="ms-3">No Playlist Found</li>
                                    }         
                                </ul>
                            </div>
                            <span className="me-5 float-end">{item.artist.name}</span>
                        </li>

                    ))
                }

            </ul>
        </div>

    )

}


export default SongResult