import "./index.css"
import playlistCover from "./plCover.jpg"
import cover from "./cover.jpg"
import { Link } from "react-router-dom"
function Playlist() {

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
            <div className="wd-playlist-detail container">
                <div className="wd-playlist-detail-info d-flex pt-3 ">
                    <img src={playlistCover} />
                    <div className="ms-5">
                        <h4>{samplePlaylist.title}</h4>
                        <p>{samplePlaylist.author}</p>
                        <p>Views: {samplePlaylist.view}</p>

                        <h4>Description:</h4>

                        {samplePlaylist.desc}
                    </div>
                </div>
                <hr/>
                <table className="table table-striped mt-3">
                    <tbody>
                        {samplePlaylist.songs.map((item, index) => (
                            <tr key={index} className="row">
                                <td className="col-4">
                                    <img src={cover} alt="Song Cover" />
                                </td>
                                <td className="col-3">
                                    <Link to={`/Application/Songs/${item.sid}`} className="d-flex">
                                        <p className="me-5">{item.sname}</p>
                                    </Link>
                                </td>
                                <td className="col-3">
                                    <Link to={`/Application/Profile/${item.aid}`}>
                                        <p className="ms-2">{item.author}</p>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Playlist