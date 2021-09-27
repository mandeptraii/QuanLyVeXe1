import axios from "axios";
import cookies from 'react-cookies'

export let endpoints = {
    'benxe': '/benxe/',
    'xe': '/xe/',
    'user': '/user/',
    'login': '/o/token/',
    'current-user': '/user/current-user/'
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