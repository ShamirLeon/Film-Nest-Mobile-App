import { Routes, Route, Link } from 'react-router-native'
import { View, StyleSheet } from 'react-native'
import MovieDetails from '../app/MovieDetails'
import Home from '../app/Home'
import MoviesByGenre from '../app/MoviesByGenre'


const Main = () => {
    return (
        <View style={styles.container}>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/movieDetails'>
                    <Route path=':movieId' element={<MovieDetails></MovieDetails>}></Route>
                </Route>
                <Route path='/genre'>
                    <Route path=':genreId' element={<MoviesByGenre></MoviesByGenre>}></Route>
                </Route>
            </Routes>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#11181D',
        marginTop: 32,
    }
})

export default Main