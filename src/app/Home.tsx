import { ScrollView } from 'react-native';
import TopRatedMovies from '../components/TopRatedMovies';
import UpcomingMovies from '../components/UpcomingMovies';
import NowPlayingMovies from '../components/NowPlayingMovies';

const Home = () => {
    return (
        <ScrollView>
            <TopRatedMovies />
            <UpcomingMovies />
            <NowPlayingMovies />
        </ScrollView>
    )
}

export default Home