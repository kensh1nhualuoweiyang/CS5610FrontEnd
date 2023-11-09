import { Link, useParams } from "react-router-dom"
import "./index.css"

function ProfileSongs() {
    const sampleSongID = ["1","2","3"];
    const {uID} = useParams();

    return (
        <div className="container mt-3">
            <div className="list-group">
                {
                    sampleSongID.length === 0 ? (
                        <div className="d-flex">
                            <h3 className="me-4">No Songs Created</h3>
                            <Link className="btn btn-secondary">Create Song</Link>
                        </div>

                    ) : (
                        sampleSongID.map((item, index) => (
                            <div className="list-group-item list-group-item-action">
                                <Link className="wd-profile-songs" key={item} to={`/Application/Songs/${item}`} >
                                    {item}
                                </Link>
                                <div className="float-end">
                                    <Link className="btn btn-primary me-3" to={`/Application/${uID}/${item}/creator`}>Edit</Link>
                                    <button className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
            </div>
        </div>
    );
}

export default ProfileSongs;
