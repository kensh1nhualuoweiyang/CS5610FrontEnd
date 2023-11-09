import { Link } from "react-router-dom"
import cover from "./cover.jpg"
import "./index.css"
function PlaylistResult() {
    const resultExample = [
        { title: "Song title", author: "Example author", view: 0, id: 0 },
        { title: "Song title", author: "Example author", view: 0, id: 0 },
        { title: "Song title", author: "Example author", view: 0, id: 0 },
        { title: "Song title", author: "Example author", view: 0, id: 0 }
    ]

    return (
        <div className="wd-playlist-result">
            <ul className="list-group">
                {
                    resultExample.map((item) => (
                        <li className="list-group-item list-group-item-action">
                            <img src={cover} />
                            <Link to={`/Application/Playlist/${item.id}`} className="ms-5 me-5">{item.title}</Link>
                            <Link to={`/Application/Profile/${item.author}`} className="ms-5 me-5">{item.author}</Link>
                            <span className="me-5">View : {item.view}</span>
                         
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}

export default PlaylistResult