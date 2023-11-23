import { useEffect, useState } from 'react'
import AxiosConfig from "../axios-config";
import { MovieContext } from "./MovieContext";
import { IGenre } from '../types/movies.interface';

export default function MovieProvider({ children }: { children: React.ReactNode }) {

    const [genres, setGenres] = useState<IGenre[]>();

    const getGenres = async () => {
        try {
            const response = await AxiosConfig('/genre/movie/list?language=en');
            setGenres(response.data.genres);
        } catch (error) {
            console.log(error);
        }
    }

    const genresMap = new Map<number, string>();
    genres?.forEach((genre) => {
        genresMap.set(genre.id, genre.name)
    })
    const saludo = 'hola'

    useEffect(() => {
        getGenres();
    }, [])


    return (
        <MovieContext.Provider value={{
            genresMap
        }}>
            {children}
        </MovieContext.Provider>
    )
}