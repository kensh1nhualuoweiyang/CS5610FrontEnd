import { Link, useParams } from "react-router-dom"
import "./index.css"
import { FcDislike } from "react-icons/fc";
function ProfileSongs() {
    const sampleSongID = ["1","2","3"];
    const {uid} = useParams();

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
                                    <button className="btn btn-transparent"><FcDislike/></button>
                                </div>
                            </div>
                        ))
                    )}
            </div>
        </div>
    );
}

export default ProfileSongs;
