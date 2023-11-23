import { View } from 'react-native'
import ScrollMovies from './ScrollMovies'
import { useEffect, useState } from 'react'
import { IResult } from '../types/movies.interface'
import AxiosConfig from '../axios-config'
import StyledText from './StyledText'

export default function UpcomingMovies() {
    const [upcomingMovies, setUpcomingMovies] = useState<IResult[]>()
    const [isLoading, setIsLoading] = useState(true)

    const getUpcomingMovies = async () => {
        try {
            const response = await AxiosConfig('/movie/upcoming?language=en-US&page=1');
            setUpcomingMovies(response.data.results);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUpcomingMovies();
    }, [])
    return (
        <View>
            {
                isLoading && <StyledText fontSize='subheading'>Loading...</StyledText>
            }
            {
                !isLoading && upcomingMovies && <ScrollMovies movies={upcomingMovies} title='Upcoming'></ScrollMovies>
            }
        </View>
    )
}
