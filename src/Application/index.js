import { Navigate, Route,Routes } from "react-router-dom"
import Header from "./Header"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import Profile from "./Profile"
import Playlist from "./PlayListDetail"
import SongDetail from "./SongDetail"
import GenreRec from "./GenreRec"
import SongCreator from "./SongCreator"
import SearchResult from "./SearchResult"

function Application(){
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to={"Home"}/>}/>
                <Route path="Home/*" element = {<Home/>}/>       
                <Route path="Register" element={<Register />} /> 
                <Route path="Login" element={<Login/>}/>
                <Route path="Songs/:sid/*" element={<SongDetail />} />
                <Route path="Playlist/:pID/*" element={<Playlist />} />
                <Route path="Profile/:uID/*" element={<Profile/>}/>
                <Route path="Genre/:gName/*" element={<GenreRec/>}/>
                <Route path=":uID/:sID/creator" element = {<SongCreator/>}/>
                <Route path="Search/:keyword/*" element={<SearchResult/>}/> 
            </Routes>
        </div>
    )
}

export default Application