import axios from "axios";
import cookies from 'react-cookies'

export let endpoints = {
    'benxe': '/benxe/',
    'xe': '/xe/',
    'update-xe': (xeId) => `/xe/${xeId}/`,
    'user': '/user/',
    'update-user': (userId) => `/user/${userId}/`,
    'tuyen': '/tuyen/', 
    'tuyen1': '/tuyen1/', 
    'tuyen2': '/tuyen2/', 
    'tuyen3': '/tuyen3/', 
    'tuyen4': '/tuyen4/',
    'tuyen5': '/tuyen5/',  
    'tuyen6': '/tuyen6/', 
    'chuyen': '/chuyen/', 
    'update-chuyen': (chuyenId) => `/chuyen/${chuyenId}/`,
    'chuyenchuachay': '/chuyenchuachay/', 
    'chuyendachay': '/chuyendachay/', 
    'chuyen1': '/chuyen1/', 
    'chuyen2': '/chuyen2/', 
    'chuyen3': '/chuyen3/', 
    'chuyen4': '/chuyen4/', 
    'chuyen5': '/chuyen5/', 
    'chuyen6': '/chuyen6/', 
    'benxe': '/benxe/',
    'login': '/o/token/',
    'current-user': '/user/current-user/',
    'vexe': '/vexe/',
    'update-vexe': (vexeId) => `/vexe/${vexeId}/`,
    'danhgia': '/danhgia/',
    'update-danhgia': (danhgiaId) => `/danhgia/${danhgiaId}/`
}

export let AuthAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Authorization': `Bearer ${cookies.load('access_token')}`
    }
})

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})