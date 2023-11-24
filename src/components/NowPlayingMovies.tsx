import { View } from "react-native"
import { useEffect, useState } from "react"
import AxiosConfig from "../axios-config"
import { IResult } from "../types/movies.interface"
import ScrollMovies from "./ScrollMovies"

export default function NowPlayingMovies() {

    const [nowPlayingMovies, setNowPlayingMovies] = useState<IResult[]>()

    const getNowPlayingMovies = async () => {
        try {
            const response = await AxiosConfig('/movie/now_playing?language=en-US&page=1')
            setNowPlayingMovies(response.data.results)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNowPlayingMovies();
    }, [])

    return (
        <View>
            {
                nowPlayingMovies && <ScrollMovies movies={nowPlayingMovies} title="Now Playing"></ScrollMovies>
            }
        </View>
    )
}