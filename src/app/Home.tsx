import { ScrollView } from 'react-native';
import NowPlayingMovies from '../components/NowPlayingMovies';
import UpcomingMovies from '../components/UpcomingMovies';
import TopRatedMovies from '../components/TopRatedMovies';

const Home = () => {
    return (
        <ScrollView>
            <NowPlayingMovies />
            <UpcomingMovies />
            <TopRatedMovies />
        </ScrollView>
    )
}

export default Home