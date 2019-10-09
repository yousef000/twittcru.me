import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://twittcru.firebaseio.com/'
})

export default instance;