import { useLocation, useParams } from "react-router"
import "./index.css"
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { BiUserCircle } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import * as client from "../client"
import { MdDeleteSweep } from "react-icons/md";
function SongDetail() {
    const { sid } = useParams()


    const [playlist, setPlaylist] = useState()
    const [user, setUser] = useState()
    const [songDetail, setSongDetail] = useState()
    const [comment, setComment] = useState()
    const [likes, setLikes] = useState()
    const [newComment, setNewComments] = useState()
    const getSongDetail = async () => {
        const response = await client.getSongDetail(sid)
        setSongDetail(response)
    }
    const fetchUser = async () => {
        const response = await client.getCurrUser()
        setUser(response)
        setPlaylist(response.myPlaylist)
        setLikes(response.likedSong)
        setNewComments({ user:{_id:response._id, userName:response.userName} , comment: "" })
    }
    const fetchComment = async () => {
        const response = await client.fetchComments(sid)
        setComment(response)
    }


    const handleLike = async (like, sid) => {
        const response = await client.handleLikeSong(like, sid, user._id)
        setSongDetail({ ...songDetail, likes: like ? songDetail.likes + 1 : songDetail.likes - 1 })
        setLikes(response)
    }

    const handleCommentPost = async () => {
        const response = await client.postComment(newComment.comment, sid)
        fetchComment()
    }

    const handleCommentDelete = async (item) =>{
        
        const commentUser = item.user
        const commentText = item.comment
        const response = await client.deleteComment(commentText,sid,commentUser._id)
        fetchComment()
    }

    useEffect(() => {
        fetchUser();
        getSongDetail();
        fetchComment();
    }, [sid]);
    return (
        <div className="wd-song-detail-holder">
            {
                songDetail &&
                <div className="wd-song-detail container">
                    <div className="wd-song-detail-info d-flex pt-3">


                        <img src={songDetail.image} />
                        <div className="wd-song-info ms-5">
                            <h4>{songDetail.name}</h4>
                            <p>{songDetail.artist}</p>
                            <p>Likes: {songDetail.likes}</p>
                            <audio controls>
                                <source src={songDetail.preview} type="audio/mpeg" />
                            </audio>
                            <br />
                            {user && <div className="btn-group mt-2">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Add to Playlist
                                </button>
                                <ul className="dropdown-menu">
                                    {
                                        playlist && playlist.length >= 1 ?
                                            playlist.map((item) => (
                                                <li><button type="button" className="dropdown-item" >{item}</button></li>
                                            )) :
                                            <li className="ms-3">No Playlist Found</li>
                                    }

                                </ul>
                            </div>}
                            <br />
                            {user &&
                                <>
                                    {!likes.includes(songDetail._id) ?
                                        <button className="btn btn-transparent mt-2" onClick={() => handleLike(true, songDetail._id)}><FcLike /></button> :
                                        <button className="btn btn-transparent mt-2" onClick={() => handleLike(false, songDetail._id)}><FcDislike /></button>
                                    }
                                </>
                            }

                        </div>


                    </div>
                    <hr />
                    <hr />
                    <div className="wd-song-comments">
                        <h4>Comments</h4>
                        {comment && <ul className="list-group">
                            {
                                comment.map((item) => (
                                    <li className="list-group-item ">
                                        <div className="d-flex">
                                            <BiUserCircle className="me-2" />
                                            <Link to={`/Application/Profile/${item.user._id}`} className="wd-song-comment-user">
                                                {item.user.userName}
                                            </Link>
                                            <div className="wd-comment-action">
                                                {user && (user.userName === item.user.userName || user.role === "Admin") 
                                                    && <button className="btn btn-transparent me-2" onClick={() => handleCommentDelete(item)}><MdDeleteSweep/></button>}
                                            </div>
                                        </div>

                                        <div className="wd-song-comment-body mt-2 ms-5">
                                            {item.comment}
                                        </div>
                                    </li>

                                ))
                            }
                        </ul>}
                        <hr className="mb-2 mt-3" />
                        <div className="mb-2">
                            <label for="comment" class="form-label">Enter Comments</label>
                            <textarea class="form-control" id="comment" rows="3" onChange={(e) => setNewComments({...newComment, comment:e.target.value})}></textarea>
                            <div className="float-end mt-2 mb-3">
                                <button className={`btn btn-primary ${!user && "disabled"}`} onClick={handleCommentPost}>Post</button>
                            </div>
                        </div>
                    </div>

                </div>
            }

        </div>

    )
}


export default SongDetail