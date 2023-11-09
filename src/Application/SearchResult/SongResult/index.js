
import "./index.css"

import cover from "./cover.jpg"
import { Link } from "react-router-dom"
function SongResult() {

    const resultExample = [
        { title: "Song title", author: "Example author", view: 0, id: 0 },
        { title: "Song title", author: "Example author", view: 0, id: 0 },
        { title: "Song title", author: "Example author", view: 0, id: 0 },
        { title: "Song title", author: "Example author", view: 0, id: 0 }
    ]
    const examplePlaylist = []
    return (
        <div className="wd-song-result">
            <ul className="list-group">
                {
                    resultExample.map((item) => (
                        <li className="list-group-item list-group-item-action">
                            <img src={cover} />
                            <Link to={`/Application/Songs/${item.id}`} className="ms-5 me-5">{item.title}</Link>
                            <Link to={`/Application/Profile/${item.author}`} className="ms-5 me-5">{item.author}</Link>
                            <span className="me-5">View : {item.view}</span>
                            <div className="btn-group ms-5">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                        </li>

                    ))
                }

            </ul>
        </div>

    )

}


export default SongResult