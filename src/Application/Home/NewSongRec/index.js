
import cover from "./cover.jpg"
import CarouselCtrl from "../CarouselCtrl"
import { Link, Routes, Route } from "react-router-dom"
import { AiFillPlayCircle } from "react-icons/ai"
import "./index.css"

function NewSongRec() {
    const exampleSong = [
        { title: "Example Song Name 1", id: 1, author: "Example author name" },
        { title: "Example Song Name 2", id: 2, author: "Example author name" },
        { title: "Example Song Name 3", id: 3, author: "Example author name" },
        { title: "Example Song Name 4", id: 4, author: "Example author name" },
        { title: "Example Song Name 5", id: 5, author: "Example author name" },
        { title: "Example Song Name 6", id: 6, author: "Example author name" },
        { title: "Example Song Name 7", id: 7, author: "Example author name" },
        { title: "Example Song Name 8", id: 8, author: "Example author name" },
        { title: "Example Song Name 9", id: 9, author: "Example author name" },
        { title: "Example Song Name 10", id: 10, author: "Example author name" },
        { title: "Example Song Name 11", id: 11, author: "Example author name" },
        { title: "Example Song Name 12", id: 12, author: "Example author name" },
        { title: "Example Song Name 13", id: 13, author: "Example author name" },
        { title: "Example Song Name 14", id: 14, author: "Example author name" },
        { title: "Example Song Name 15", id: 15, author: "Example author name" }
    ]

    const songRec = []
    for (let i = 0; i < exampleSong.length; i += 12) {
        songRec.push(exampleSong.slice(i, i + 12))
    }


    return (
        <>
            <div id="newSongRec" className="wd-new-song-slide carousel slide mb-2" >
                <div className="carousel-inner mb-3">
                    <h4 className="mt-4 mb-3">New Release</h4>
                    {
                        Array.from({ length: songRec.length }).map((_, index) => (
                            <div className={`wd-new-song-item carousel-item ${index == 0 && "active"}`}>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-md-11">
                                            <table className="wd-new-song-table table">
                                                <tbody>
                                                    {
                                                        Array.from({ length: (songRec[index].length / 3) }).map((_,rowIndex) => (
                                                            <tr>
                                                                {
                                                                    songRec[index].slice(rowIndex * 4,(rowIndex + 1) * 4).map((item) => (
                                                                        <td>
                                                                            <Link to={`/Application/Songs/${item.id}`} className="d-flex">
                                                                                <div className="wd-new-songRec-image-container">
                                                                                    <img src={cover} alt="Cover" />
                                                                                    <AiFillPlayCircle />
                                                                                </div>
                                                                                <div className="ms-3">
                                                                                    <p className="wd-new-song-rec-name">{item.title}</p>
                                                                                    <p className="wd-new-song-rec-author">{item.author}</p>
                                                                                </div>
                                                                            </Link>

                                                                        </td>
                                                                    ))
                                                                }
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <CarouselCtrl id="newSongRec" leng={songRec.length}/>
            </div>
          
        </>

    )
}

export default NewSongRec