import { ScrollView, StyleSheet } from 'react-native';
import theme from '../src/theme';
import NowPlayingMovies from '../src/components/NowPlayingMovies';
import UpcomingMovies from '../src/components/UpcomingMovies';
import TopRatedMovies from '../src/components/TopRatedMovies';
import { Stack } from 'expo-router';

const Home = () => {
    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ headerShown: false, statusBarStyle: 'dark' }}></Stack.Screen>
            <NowPlayingMovies />
            <UpcomingMovies />
            <TopRatedMovies />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.DarkBlue
    }
})

export default Home