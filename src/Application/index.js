import { Navigate, Route,Routes } from "react-router-dom"
import Header from "./Header"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import Profile from "./Profile"
import Playlist from "./PlayListDetail"
import SongDetail from "./SongDetail"

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
                <Route path="Playlist/:pid/*" element={<Playlist />} />
                <Route path="Profile/:uid/*" element={<Profile/>}/>
                <Route path="Search/:keyword/*" element={<SearchResult/>}/> 
            </Routes>
        </div>
    )
}

export default Application