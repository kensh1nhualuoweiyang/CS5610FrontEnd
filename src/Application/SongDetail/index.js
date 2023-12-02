import { useLocation, useNavigate, useParams } from "react-router"
import "./index.css"
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { BiUserCircle } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import * as client from "../client"
import { MdDeleteSweep } from "react-icons/md";
import { MdOutlineReport } from "react-icons/md";
function SongDetail() {
    const { sid } = useParams()
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const [addError, setAddError] = useState()
    const [playlist, setPlaylist] = useState()
    const [user, setUser] = useState()
    const [songDetail, setSongDetail] = useState()
    const [comment, setComment] = useState()
    const [likes, setLikes] = useState()
    const [newComment, setNewComments] = useState()
    const [report, setReport] = useState("")
    const [reportErr, setReportErr] = useState("")
    const [commentErr, setCommentErr] = useState("")
    const getSongDetail = async () => {
        const response = await client.getSongDetail(sid,pathname)
        fetchComment()
        setSongDetail(response)
    }
    const fetchUser = async () => {
        const response = await client.getCurrUser()
        setUser(response)
        setNewComments("")
        fetchLikedSong()

    }
    const fetchComment = async () => {
        const response = await client.fetchComments(sid)
        setComment(response)
    }

    const fetchPlaylist = async () => {
        const response = await client.getPlaylistByUser()
        setPlaylist(response)
    }
    const fetchLikedSong = async () => {
        const response = await client.getLikedSongByUser()
        setLikes(response)
    }
    const handleLike = async (like, sid) => {
        await client.handleLikeSong(like, sid, user._id)
        setSongDetail({ ...songDetail, likes: like ? songDetail.likes + 1 : songDetail.likes - 1 })
        await fetchLikedSong()
    }

    const handleCommentPost = async () => {
        try{
            await client.postComment(newComment, sid)
            await fetchComment()
            setNewComments("")
            setCommentErr("")
        }
        catch(err){
            setCommentErr(err.response.data.message)
        }
       
    }

    const handleCommentDelete = async (item) => {
        await client.deleteComment(sid, item._id)
        await fetchComment()
    }

    const handleAddToPlaylist = async (pid) => {
        try {
            await client.addToPlaylist(pid, sid)
            setAddError("")
        }
        catch (err) {
            setAddError(err.response.data.message)
        }

    }

    const handleReport = async (commentText, cid) => {
        try {
            await client.createReport(commentText, report, cid, sid)
            setReportErr("")
            setReport("")
        }
        catch (err) {
            setReportErr(err.response.data.message)
        }
    }

    useEffect(() => {
        getSongDetail()
       
        fetchUser()
    }, [pathname]);
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
                            {user && user.role !== "User" && <div className="btn-group mt-2 mb-4">
                                <button className="btn btn-secondary dropdown-toggle" onClick={fetchPlaylist} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Add to Playlist
                                </button>
                                <ul className="dropdown-menu">

                                    {
                                        playlist && playlist.length >= 1 ?
                                            playlist.map((item) => (

                                                <li><button type="button" className="dropdown-item" onClick={() => handleAddToPlaylist(item._id)}>{item.name}</button></li>
                                            )) :
                                            <li className="ms-3">No Playlist Found</li>
                                    }

                                </ul>
                            </div>}
                            {user && likes &&
                                <>
                                    
                                    {!likes.some((item) => item.sid === sid) ?
                                        <button className="btn btn-transparent mb-4" onClick={() => handleLike(true, songDetail._id)}><FcLike /></button> :
                                        <button className="btn btn-transparent mb-4" onClick={() => handleLike(false, songDetail._id)}><FcDislike /></button>}

                                </>
                            }
                            <br />
                            {addError && <span className="mt-5 alert alert-secondary">{addError}</span>}


                        </div>


                    </div>
                    <hr />
                    <hr />
                    <div className="wd-song-comments">
                        <h4>Comments</h4>
                        {comment && <ul className="list-group">
                            {console.log(comment)}
                            {
                                comment.map((item) => (
                                    <li key={item._id} className="list-group-item ">
                                        <div className="d-flex">
                                            <BiUserCircle className="me-2" />
                                            <Link to={`/Application/Profile/${item.user._id}`} className="wd-song-comment-user">
                                                {item.user.userName}
                                            </Link>
                                            <div className="wd-comment-action">
                                                <button type="button" className="btn float-end  btn-transparent dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                                    <MdOutlineReport />
                                                </button>

                                                {user && (user.userName === item.user.userName || user.role === "Admin")
                                                    && <button className="btn btn-transparent me-2" onClick={() => handleCommentDelete(item)}><MdDeleteSweep /></button>}
                                                <form className="dropdown-menu p-4">
                                                    <div className="mb-3">
                                                        {reportErr && <span className="alert alert-warning">{reportErr}</span>}
                                                        <label for="title" className="form-label">Report Reason</label>
                                                        <input type="text" className="form-control" id="title" value={report} onChange={(e) => setReport(e.target.value)} />
                                                    </div>

                                                    <button type="submit" className="wd-report-button btn btn-primary" onClick={() => handleReport(item.comment, item._id)}>Send</button>
                                                </form>

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
                        {commentErr && <div className="alert alert-warning">{commentErr}</div>}
                        <div className="mb-2">
                            <label for="comment" className="form-label">Enter Comments</label>
                            <textarea className="form-control" id="comment" rows="3" onChange={(e) => setNewComments(e.target.value)}></textarea>
                            <div className="float-end mt-2 mb-3">
                                <button className="btn btn-primary" onClick={user? handleCommentPost : () => navigate("/Application/Login")}>Post</button>
                            </div>
                        </div>
                    </div>

                </div>
            }

        </div>

    )
}


export default SongDetail