import { Link, useParams } from "react-router-dom";
import "./index.css";
import cover from "./cover.jpg";

function GenreRec() {
  const { gName } = useParams();
  const exampleSong = [
    { title: "Example Song Name 1", id: 1, author: "Example author name", aID:1 },
    { title: "Example Song Name 2", id: 2, author: "Example author name", aID:2  },
    { title: "Example Song Name 3", id: 3, author: "Example author name" , aID:3 },
    { title: "Example Song Name 4", id: 4, author: "Example author name" , aID:4 },
    { title: "Example Song Name 5", id: 5, author: "Example author name" , aID:5 },
    { title: "Example Song Name 6", id: 6, author: "Example author name" , aID:6 },
    { title: "Example Song Name 7", id: 7, author: "Example author name", aID:7  },
    { title: "Example Song Name 8", id: 8, author: "Example author name" , aID:8 },
    { title: "Example Song Name 9", id: 9, author: "Example author name" , aID:9 },
    { title: "Example Song Name 10", id: 10, author: "Example author name", aID:10  },
    { title: "Example Song Name 11", id: 11, author: "Example author name" , aID:11 },
    { title: "Example Song Name 12", id: 12, author: "Example author name" , aID:12 },
    { title: "Example Song Name 13", id: 13, author: "Example author name" , aID:13 },
    { title: "Example Song Name 14", id: 14, author: "Example author name" , aID:14 },
    { title: "Example Song Name 15", id: 15, author: "Example author name", aID:15  }
  ]
  return (
    <div className="wd-genre-rec">
      <h3 className="mt-3">Top {gName} Songs</h3>
      <table className="table table-striped mt-2">
        <tbody>
          {exampleSong.map((item, index) => (
            <tr key={index} className="row">
              <td className="col-2">
                <p className="me-5 wd-genre-rank">Rank: {index + 1}</p>
              </td>
              <td className="col-2">
                <img className="wd-genre-rec-song-cover" src={cover} alt="Song Cover" />
              </td>
              <td className="col-5">
                <Link to={`/Application/Songs/${item.id}`} className="d-flex">
                  <p className="me-5">{item.title}</p>
                </Link>
              </td>
              <td className="col-3">
                <Link to={`/Application/Profile/${item.aID}`}>
                  <p className="ms-2">{item.author}</p>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenreRec;
