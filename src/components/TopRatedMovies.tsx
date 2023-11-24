import { View } from "react-native"
import { useEffect, useState } from "react"
import AxiosConfig from "../axios-config"
import { IResult } from "../types/movies.interface"
import ScrollMovies from "./ScrollMovies"

export default function TopRatedMovies() {

    const [topRated, setTopRatedMovies] = useState<IResult[]>()

    const getTopRatedMovies = async () => {
        try {
            const response = await AxiosConfig('/movie/top_rated?page=1')
            setTopRatedMovies(response.data.results)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTopRatedMovies();
    }, [])

    return (
        <View>
            {
                topRated && <ScrollMovies movies={topRated} title="Top Rated"></ScrollMovies>
            }
        </View>
    )
}