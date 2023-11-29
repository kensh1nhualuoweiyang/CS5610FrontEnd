import "./index.css"
import CarouselCtrl from "../CarouselCtrl"
import { Link } from "react-router-dom"
import { AiFillPlayCircle } from "react-icons/ai"
import SongDetail from "../../SongDetail"
import { useState } from "react"
import { useEffect } from "react"
import * as client from "../../client"




function SongRecomm() {
    const [songs,setSongs] = useState()
    const fetchSongs = async () => {
        const response = await client.fetchSongRec()
        const songRec = []
        for (let i = 0; i < response.length; i += 9) {
            songRec.push(response.slice(i, i + 9))
        }
        setSongs(songRec)
    }


    useEffect(() => {
        fetchSongs()
    },[])

    return (
        <>
            <div id="songRecomm" className="wd-song-slide carousel slide" >
                <div className="carousel-inner">
                    <h4 className="mt-4 mb-3">Top Songs Among Community</h4>
                    {
                        songs && Array.from({ length: songs.length }).map((item, index) => (
                            <div className={`wd-song-recomm-item carousel-item ${index === 0 && "active"}`}>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10">
                                            <table className="wd-song-table table table-striped">
                                                <tbody>
                                                    {
                                                        Array.from({ length: Math.ceil(songs[index].length / 3) }).map((_,rowIndex) => (
                                                            <tr>
                                                                {
                                                                   songs[index].slice(rowIndex * 3,(rowIndex + 1) * 3).map((item) => (
                                                                        <td>

                                                                            <Link to={`/Application/Songs/${item.sid}`} className="d-flex">
                                                                                <div className="wd-songRec-image-container">
                                                                                    <img src={item.image} alt="Cover" />
                                                                                    <AiFillPlayCircle />
                                                                                </div>
                                                                                <div className="ms-3">
                                                                                    <p className="wd-song-rec-name">{item.name}</p>
                                                                                    <p className="wd-song-rec-author">{item.artist}</p>
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
                {songs && <CarouselCtrl id="songRecomm" leng={songs.length} />}
            </div>
        </>

    )


}
export default SongRecomm