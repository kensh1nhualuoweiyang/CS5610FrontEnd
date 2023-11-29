import { Link, useParams } from "react-router-dom";
import "./index.css"
import { useState } from "react";
import { useEffect } from "react";
import * as client from "../../client"
function MyPlaylist() {

    const [user, setUser] = useState()
    const { uid } = useParams()
    const [playList, setPlaylist] = useState([])
    const [newPlaylist, setNewPlaylist] = useState({
        name:"",
        description:""
    })
    
    const [err, setErr] = useState("")
    const fetchPlaylist = async () => {
        const response = await client.getPlaylistByUser(uid)
        setPlaylist(response)
    }
    useEffect(() => {
        const fetchUser = async () => {
            const response = await client.getCurrUser()
            setUser(response)
        }

        fetchPlaylist()
        fetchUser()
    }, [uid])

    const handleCreatePlaylist = async () => {
        try {
            await client.createPlaylist(newPlaylist)
            setNewPlaylist({
                name:"",
                description:""
            })
            setErr("")
            await fetchPlaylist()
        }
        catch (err) {
            setErr(err.response.data.message)
        }
    }

    const handleDelete = async (id) => {
        await client.deletePlaylist(id)
        await fetchPlaylist()
    }



    return (
        <div className="container mt-3">
            <div className="list-group">
                {
                    playList &&
                    <>
                        {
                            playList.length === 0 ? (
                                <>

                                    <h3 className="me-4">No Playlist Found</h3>

                                    {err && <div className="alert alert-primary mt-2">{err}</div>}
                                </>

                            ) : (
                                playList.map((item, index) => (
                                    <div key={index} className=" list-group-item list-group-item-action">
                                        <Link className="wd-my-playlist" key={item} to={`/Application/Playlist/${item._id}`} >
                                            {item.name}
                                        </Link>
                                        <div className="float-end">
                                            <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </>
                }
            </div>
            {user && user._id === uid && <>
                <button type="button" className="btn float-end mt-3 btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                    Create Playlist
                </button>
                <form className="dropdown-menu p-4">
                    <div className="mb-3">
                        <label for="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={newPlaylist.title} onChange={(e) => setNewPlaylist({...newPlaylist, name:e.target.value})} />
                    </div>
                    <div class="mb-3">
                        <label for="desc" class="form-label">Description</label>
                        <textarea class="form-control" id="desc" rows="3" value={newPlaylist.description} onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleCreatePlaylist}>Create</button>
                </form>
            </>}
        </div>
    );
}
export default MyPlaylist