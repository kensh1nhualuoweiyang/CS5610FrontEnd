import "./index.css"
import playlistCover from "./plCover.jpg"
import cover from "./cover.jpg"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as client from "../client"
function Playlist() {

    const [playlist, setPlaylist] = useState()
    const { pid } = useParams()
    const [user, setUser] = useState()
    const fetchPlaylist = async () => {
        const response = await client.fetchPlaylistDetail(pid)
        setPlaylist(response)
    }
    const fetchUser = async () => {
        const response = await client.getCurrUser()
        setUser(response)
    }
    useEffect(() => {
        fetchPlaylist()
        fetchUser()
    }, [pid])


    const samplePlaylist = {
        title: "Sample Playlist",
        author: "Sample Author",
        desc: "Description Sentence sample",
        view: 0,
        songs: [
            { sid: 0, sname: "ExampleSongName1", author: "ExampleAuthor", aid: 1 },
            { sid: 1, sname: "ExampleSongName2", author: "ExampleAuthor", aid: 2 },
            { sid: 2, sname: "ExampleSongName3", author: "ExampleAuthor", aid: 3 },
            { sid: 3, sname: "ExampleSongName4", author: "ExampleAuthor", aid: 4 },
            { sid: 4, sname: "ExampleSongName5", author: "ExampleAuthor", aid: 5 },
            { sid: 5, sname: "ExampleSongName6", author: "ExampleAuthor", aid: 6 },
            { sid: 6, sname: "ExampleSongName8", author: "ExampleAuthor", aid: 7 },

        ]
    }

    return (
        <div className="wd-playlist-detail-container">
            {console.log(playlist)}
            {playlist &&
                <div className="wd-playlist-detail container">
                    <div className="wd-playlist-detail-info d-flex pt-3 ">
                        <img src={playlistCover} />
                        <div className="ms-5">
                            <h4>{playlist.name}</h4>
                            <p>{playlist.author.name}</p>
                            <p>Like: {playlist.likes}</p>

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