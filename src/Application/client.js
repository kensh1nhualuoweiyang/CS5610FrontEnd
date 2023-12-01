
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

export const getSongDetail = async (sid,url) =>{
    console.log("here")
    const response = await request.get(`${BASE_API}/songDetail?sid=${sid}`)
    console.log("done");
    console.log(response);
    return response.data
}



export const handleLikeSong = async (like,sid,uid) => { 
    await request.put(`${BASE_API}/songLikes?like=${like}&sid=${sid}&uid=${uid}`)
}

export const fetchComments = async (sid) => {
    const response = await request.get(`${BASE_API}/comments?sid=${sid}`)
    return response.data
}

export const postComment = async (comment,sid) => {
    await request.post(`${BASE_API}/comments?sid=${sid}&comment=${comment}`)
}

export const deleteComment = async (sid,id) => {
    await request.delete(`${BASE_API}/comments?sid=${sid}&commentId=${id}`)
}

export const addToPlaylist = async (pid,sid) =>{
    const response = await request.put(`${BASE_API}/AddToPlayList?id=${pid}&sid=${sid}`)

    return response
}

export const getPlaylistByUser = async (id) => {
    const response = await request.get(`${BASE_API}/userPlaylist?uid=${id}`)
    return response.data
}

export const createPlaylist = async (item) => {
    const {name,description} = item
    const response = await request.post(`${BASE_API}/playlist?name=${name}&description=${description}`)
    return response.data
}

export const deletePlaylist = async (id) => {
    const response = await request.delete(`${BASE_API}/playlist?id=${id}`)
    return response.data
}

export const getLikedPlaylistByUser = async (id) => {
    const response = await request.get(`${BASE_API}/likedPlaylist?uid=${id}`)
    return response.data
}

export const getLikedSongByUser = async (id) => {
    const response = await request.get(`${BASE_API}/likedSong?uid=${id}`)
    return response.data
}

export const getFollowerByUser = async (id) => {
    const response = await request.get(`${BASE_API}/follower?uid=${id}`)
    return response.data
}

export const getFollowingByUser = async (id) => {
    const response = await request.get(`${BASE_API}/following?uid=${id}`)
    return response.data
}

export const updateFollows = async(follow,id) => {
    const response = await request.put(`${BASE_API}/followers?follow=${follow}&id=${id}`)
    return response.data
}

export const fetchPlaylistDetail = async (pid) => {
    const response = await request.get(`${BASE_API}/playlist?pid=${pid}`)
    return response.data
}


export const updateLikedPlaylist = async (like, pid) => {
    const response = await request.put(`${BASE_API}/playlist?like=${like}&pid=${pid}`)
    return response.data
}

export const fetchPlaylistSearch = async (keyword) => {
    const response = await request.get(`${BASE_API}/playlistResult?keyword=${keyword}`)
    return response.data
}

export const fetchSongRec = async () => {
    const response = await request.get(`${BASE_API}/songRec`)
    return response.data
}

export const fetchPlaylistRec = async () => {
    const response = await request.get(`${BASE_API}/playlistRec`)
    return response.data
}

export const createReport = async (text,reason,cid,sid) => {
    const response = await request.post(`${BASE_API}/report?text=${text}&reason=${reason}&cid=${cid}&sid=${sid}`)
    return response.data
}

export const fetchReport = async () =>{
    const response = await request.get(`${BASE_API}/reports`)
    return response.data
}
export const resolveReport  = async (deleteReport,id) => {
    const response = await request.put(`${BASE_API}/resolve?deleteReport=${deleteReport}&id=${id}`)
    return response.data
}

export const updateProfile = async (item) => {
    const response = await request.put(`${BASE_API}/updateProfile`,item)
    return response.data
}

export const requestRole = async (uid,role) => {
    const response = await request.post(`${BASE_API}/request?uid=${uid}&role=${role}`)
    return response.data
}

export const fetchRequest = async () => {
    const response = await request.get(`${BASE_API}/request`)
    return response.data
}

export const processRequest = async(accept,id,uid,role) => {
    const response = await request.put(`${BASE_API}/request?accept=${accept}&id=${id}&uid=${uid}&role=${role}`)
    return response.data
}