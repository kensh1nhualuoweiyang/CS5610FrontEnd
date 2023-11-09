import { useParams } from "react-router"
import "./index.css"
import cover from "./cover.jpg"
import { BiUserCircle } from "react-icons/bi"
import { Link } from "react-router-dom"

function SongDetail() {
    const { sid } = useParams()
    const examplePlaylist = []

    const exampleComments = [
        { userId: 0, userName: "SampleUser 0 ", comment: "Test Comment 0" },
        { userId: 1, userName: "SampleUser 1 ", comment: "Test Comment 1" },
        { userId: 2, userName: "SampleUser 2 ", comment: "Test Comment 2 \n With Break" },
        { userId: 3, userName: "SampleUser 3 ", comment: "Test Comment 3" },
        { userId: 4, userName: "SampleUser 4 ", comment: "Test Comment 4" },
        { userId: 5, userName: "SampleUser 5 ", comment: "Test Comment 5" },
    ]

    return (
        <div className="wd-song-detail-holder">
            <div className="wd-song-detail container">
                <div className="wd-song-detail-info d-flex pt-3">
                    <img src={cover} />
                    <div className="wd-song-info ms-5">
                        <h4>Example Song Title</h4>
                        <p>Example Author Name</p>
                        <p>Likes: 0</p>
                        <div className="btn-group">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Add to Playlist
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    examplePlaylist.length >= 1 ?
                                        examplePlaylist.map((item) => (
                                            <li><button type="button" className="dropdown-item" >{item}</button></li>
                                        )) :
                                        <li className="ms-3">No Playlist Found</li>
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="wd-song-lyrics">
                    <h4>Lycris</h4>

                    Sample lyrics 1<br />
                    Sample lyrics 10<br />
                    Sample lyrics 100.<br />
                    Sample lyrics 10086.<br />


                </div>
                <hr />
                <div className="wd-song-comments">
                    <h4>Comments</h4>
                    <ul className="list-group">
                        {
                            exampleComments.map((item) => (
                                <li className="list-group-item ">
                                    <div className="d-flex">
                                    <BiUserCircle className="me-2" />
                                        <Link to={`/Application/Profile/${item.userId}`} className="wd-song-comment-user">
                                            
                                            {item.userName}
                                        </Link>
                                    </div>

                                    <div className="wd-song-comment-body mt-2 ms-5">
                                        {item.comment}
                                    </div>
                                </li>

                            ))
                        }
                    </ul>

                </div>

            </div>
        </div>

    )
}


export default SongDetail