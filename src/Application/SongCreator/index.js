

import { useState } from "react"
import "./index.css"
import { Link, useParams } from "react-router-dom"

function SongCreator() {
  const [genre, setGenre] = useState("")
  const { sID } = useParams()
  const availableGenre = ["Rock", "Pop", "R&B Hip-Hop", "Latin", "Country", "Classical", "EDM", "Jazz"]
  return (
    <div className="wd-song-create ">
      <div className="row g-2">
        <div className="col-3">
          <label for="title" className="col-form-label">Song Title</label>
        </div>
        <div className="col-auto">
          <input type="text" id="title" className="form-control" />
        </div>
      </div>
      <div className="row g-2 mt-2">
        <div className="col-3">
          <label for="title" className="col-form-label">Genre</label>
        </div>
        <div className="dropdown col-auto">
          <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" type="button">
            {genre}
          </button>
          <ul className="dropdown-menu">
            {
              availableGenre.map((item) => (
                <li className="dropdown-item" onClick={() => setGenre(item)}>{item}</li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className="row g-2 mt-2">
        <div className="mb-3 col-3">
          <label for="lyrics" className="form-label">lyrics</label>
        </div>
        <div className="mb-3 col-9">
          <textarea className="wd-song-create-lyrics form-control" id="lyrics" rows="20" onChange={(e) => (console.log(e.target.value))}></textarea>
        </div>
      </div>
      <div className="d-flex">
        <button className="btn btn-dark me-4">Submit</button>
        <Link to={`/Application/Song/${sID}`} className="btn btn-secondary">Cancel</Link>
      </div>

    </div >

  )
}

export default SongCreator