import axios from "axios";
import { API_PUBLIC_TOKEN_TMDB } from '@env'

const AxiosConfig = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: { language: 'en-US' },
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_PUBLIC_TOKEN_TMDB}`
    }
})

export default AxiosConfig