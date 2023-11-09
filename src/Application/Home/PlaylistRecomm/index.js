import "./index.css"
import coverImg from "./cover.jpg"
import { Link, Route, Routes } from "react-router-dom";
import CarouselCtrl from "../CarouselCtrl";
import Playlist from "../../PlayListDetail";

function PlaylistRecomm() {

    const examplePlaylist = [
        { title: "Playlist Name 1", view: 0, id: 1 },
        { title: "Playlist Name 2", view: 0, id: 2 },
        { title: "Playlist Name 3", view: 0, id: 3 },
        { title: "Playlist Name 4", view: 0, id: 4 },
        { title: "Playlist Name 5", view: 0, id: 5 },
        { title: "Playlist Name 6", view: 0, id: 6 },
        { title: "Playlist Name 7", view: 0, id: 7 },
        { title: "Playlist Name 8", view: 0, id: 8 },
        { title: "Playlist Name 9", view: 0, id: 9 },
        { title: "Playlist Name 10", view: 0, id: 10 },
        { title: "Playlist Name 11", view: 0, id: 11 },
        { title: "Playlist Name 12", view: 0, id: 12 },
        { title: "Playlist Name 13", view: 0, id: 13 },
        { title: "Playlist Name 14", view: 0, id: 14 },
        { title: "Playlist Name 15", view: 0, id: 15 },
        { title: "Playlist Name 16", view: 0, id: 16 },
    ]



    const slides = []

    for (let i = 0; i < examplePlaylist.length; i += 5) {
        slides.push(examplePlaylist.slice(i, i + 5))
    }


    return (
        <div id="playListCarousel" className="wd-playlist-slide carousel slide" >
            <div className="carousel-inner mb-3">
                <h4>Top Playlist</h4>
                {
                    Array.from({ length: slides.length }).map((_, slideIndex) => (
                        <div className={`wd-playlist-slide-item carousel-item ${slideIndex === 0 && 'active'}`}>
                            {console.log(slideIndex)}
                            <div className="wd-playlist-slide-element">

                                {slides[slideIndex].map((item, index) => (

                                    <Link to={`/Application/Playlist/${item.id}`} className="wd-playlist-card card mx-3 mt-5">
                                        <img src={coverImg} className="card-img-top" />
                                        <div className="card-body py-0 px-0">
                                            <h5 className="card-title mb-0">{item.title}</h5>
                                        </div>
                                        <p class="card-text">View: {item.view}</p>
                                    </Link>

                                ))}
                            </div>

                            {console.log(slides[slideIndex])}



                        </div>
                    ))

                }
            </div>
            <CarouselCtrl id="playListCarousel" leng={slides.length} />
        </div >




    )
}

export default PlaylistRecomm;