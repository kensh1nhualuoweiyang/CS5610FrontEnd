import { Link } from "react-router-dom";
import "./index.css"

function ProfilePlaylist() {

    const playListHolder = []

    return (
        <div className="container mt-3">
            <div className="list-group">
                {
                    playListHolder.length === 0 ? (
                        <div className="d-flex">
                            <h3 className="me-4">No Playlist Created</h3>
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                Create Playlist
                            </button>
                            <form className="dropdown-menu p-4">
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" />
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="category" id="public" />
                                    <label class="form-check-label" for="public">
                                        Public
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="category" id="private" checked />
                                    <label class="form-check-label" for="private">
                                        Private
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary">Create</button>
                            </form>
                        </div>

                    ) : (
                        playListHolder.map((item, index) => (
                            <div className="list-group-item list-group-item-action">
                                <Link className="wd-profile-playlist" key={item} to={`/Application/Playlist/${item}`} >
                                    {item}
                                </Link>
                                <div className="float-end">
                                    <Link className="btn btn-primary me-3">Edit</Link>
                                    <button className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
            </div>
        </div>
    );
}
export default ProfilePlaylist