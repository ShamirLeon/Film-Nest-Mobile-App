import { Stack } from 'expo-router'
import MovieProvider from '../src/context/MovieProvider'

const StackLayout = () => {
    return (
        <MovieProvider>
            <Stack>
            </Stack>
        </MovieProvider>
    )
}

export default StackLayout