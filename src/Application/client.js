
import axios from "axios";
const request = axios.create({ withCredentials: true })
const BASE_API = process.env.REACT_APP_MUSIC_WEB_APP_BASE || "http://localhost:4000/api"

export const register = async (item) => {
    const response = await request.post(`${BASE_API}/register`, item)
    return response.data
}

export const login = async (item) => {
    const response = await request.post(`${BASE_API}/login`, item)
    return response.data
}

export const logOut = async () => {
    const response = await request.post(`${BASE_API}/logOut`)
    return response.data
}

export const getCurrUser = async () => {
    const response = await request.post(`${BASE_API}/currUser`)
    return response.data
}

export const getUserInfo = async (id) => {
    const response = await request.post(`${BASE_API}/userInfo?uid=${id}`)
    return response.data
} 

export const searchUsers = async (keyword) => {
    const response = await request.get(`${BASE_API}/user?keyword=${keyword}`)
    return response.data
}

export const searchSongs = async (keyword) => {
    const response = await request.get(`${BASE_API}/songs?keyword=${keyword}`)
    return response.data
}

export const getSongDetail = async (sid) =>{
    const response = await request.get(`${BASE_API}/songDetail?sid=${sid}`)
    return response.data
}

export const getLikeSongs = async (uid) => {
    const response = await request.get(`${BASE_API}/likesSong?uid=${uid}`)
    return response.data
}

export const handleLikeSong = async (like,sid,uid) => { 
    const response = await request.put(`${BASE_API}/songs?like=${like}&sid=${sid}&uid=${uid}`)
    await request.put(`${BASE_API}/songLikes?like=${like}&sid=${sid}`)
    return response.data
}

export const fetchComments = async (sid) => {
    const response = await request.get(`${BASE_API}/comments?sid=${sid}`)
    return response.data
}

export const postComment = async (comment,sid) => {
    const response = await request.post(`${BASE_API}/comments?sid=${sid}&comment=${comment}`)
}

export const deleteComment = async (comment, sid, uid) => {
    const response = await request.delete(`${BASE_API}/comments?sid=${sid}&comment=${comment}&uid=${uid}`)
}