
import "./index.css"
import { Link, useParams } from "react-router-dom"
import * as client from "../../client"
import { useState } from "react"
import { useEffect } from "react"
function SongResult() {
    const [songs, setSongs] = useState(null)
    const { keyword } = useParams()

    const getSongResult = async () => {
        const data = await client.searchSongs(keyword)
        setSongs(data.data)
    }

    useEffect(() => {
        getSongResult()
    }, [keyword])
    return (
        <div className="wd-song-result">
            <ul className="list-group">
               
                {

                    songs && songs.map((item) => (
                        <li className="list-group-item list-group-item-action">
                            <img src={item.album.cover} />
                            <Link to={`/Application/Songs/${item.id}`} className="ms-5 me-5">{item.title}</Link>
                            <span className="me-5 float-end">{item.artist.name}</span>
                        </li>

                    ))
                }

            </ul>
        </div>

    )

}


export default SongResult