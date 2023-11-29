import "./index.css"
import coverImg from "./cover.jpg"
import { Link } from "react-router-dom";
import CarouselCtrl from "../CarouselCtrl";
import { useState } from "react";
import { useEffect } from "react";
import * as client from "../../client"
function PlaylistRecomm() {

    const [playlist, setPlaylist] = useState()

    const fetchPlaylist = async () => {
        const response = await client.fetchPlaylistRec()
        const playlistRec = []
        for (let i = 0; i < response.length; i += 5) {
            playlistRec.push(response.slice(i, i + 5))
        }
        setPlaylist(playlistRec)
    }

    useEffect(() => {
        fetchPlaylist()
    }, [])

    return (

        <div id="playListCarousel" className="wd-playlist-slide carousel slide" >



            <div className="carousel-inner mb-3">
                <h4>Top Playlist Among Community</h4>
                { playlist &&
                    Array.from({ length: playlist.length }).map((_, slideIndex) => (
                        <div className={`wd-playlist-slide-item carousel-item ${slideIndex === 0 && 'active'}`}>
                            <div className="wd-playlist-slide-element">

                                {playlist[slideIndex].map((item, index) => (

                                    <Link to={`/Application/Playlist/${item._id}`} className="wd-playlist-card card mx-3 mt-5">
                                        <img src={coverImg} className="card-img-top" />
                                        <div className="card-body py-0 px-0">
                                            <h5 className="card-title mb-0">{item.name}</h5>
                                        </div>
                                        <p class="card-text">Likes: {item.likes}</p>
                                    </Link>

                                ))}
                            </div>

                        </div>
                    ))

                }
            </div>
           {playlist && <CarouselCtrl id="playListCarousel" leng={playlist.length} />}



        </div >




    )
}

export default PlaylistRecomm;