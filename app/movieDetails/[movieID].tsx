import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe'
import StyledText from '../../src/components/StyledText';


import AxiosConfig from '../../src/axios-config';
import { PUBLIC_IMAGE_TMDB_URL } from '@env'
import { IMovieDetails, IMovieCredits, IMovieImages, IVideo, IMovieVideos, Type } from '../../src/types/movies.interface';
import theme from '../../src/theme';

const MovieDetails = () => {

    const { movieID } = useLocalSearchParams();

    const [movie, setMovie] = useState<IMovieDetails>();
    const [movieCredits, setMovieCredits] = useState<IMovieCredits>();
    const [movieImages, setMovieImages] = useState<IMovieImages>();
    const [movieVideos, setMovieVideos] = useState<IVideo[]>();
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);


    const getMovieDetails = async () => {
        try {
            const response = await AxiosConfig(`/movie/${movieID}`)
            setMovie(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    /* Function to get movie credits and filter cast with no null profile path */
    const getMovieCredits = async () => {
        try {
            const response = await AxiosConfig(`/movie/${movieID}/credits`)
            setMovieCredits(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const filteredCast = movieCredits && movieCredits.cast.filter((person) => {
        return person.profile_path !== null
    })

    /* Function to get movie images and filter images per aspect ratio */

    const getMovieImages = async () => {
        try {
            const response = await AxiosConfig(`/movie/${movieID}/images`)
            setMovieImages(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const filteredMovieImages = movieImages && movieImages.backdrops.filter((backdrop) => {
        return backdrop.aspect_ratio
    })

    /* Function to get movie videos */

    const getMovieVideos = async () => {
        try {
            const response = await AxiosConfig(`/movie/${movieID}/videos?language=es-ES`);
            const data: IMovieVideos = response.data;
            setMovieVideos(data.results);
        } catch (error) {
            console.log(error);
        }
    }

    const trailerMovie = movieVideos?.find((movie) => {
        return movie.type == Type.Trailer
    })

    /* RENDERS */

    const CastImageList = () => {
        return (
            <View style={styles.castContainer}>
                {
                    filteredCast?.slice(0, 5).map(person => (
                        <Link key={person.id} href={`/personDetails/${person.id}`} style={{ borderRadius: 30 }}>
                            <ImageBackground style={styles.profilePicture} source={{ uri: `${PUBLIC_IMAGE_TMDB_URL}w780/${person.profile_path}` }}></ImageBackground>
                        </Link>
                    ))
                }
            </View>
        )
    }

    const TrailerImageList = () => {
        return (
            <View >
                <LinearGradient colors={['#11181D', 'transparent']} style={styles.fade} end={{ x: .2, y: 1 }} start={{ x: 1, y: 1 }}></LinearGradient>
                <ScrollView horizontal>
                    {
                        filteredMovieImages?.map((image, i) => (
                            <ImageBackground key={i} style={styles.imageTrailer} source={{ uri: `${PUBLIC_IMAGE_TMDB_URL}w780/${image.file_path}` }}>
                            </ImageBackground>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }

    useEffect(() => {
        getMovieDetails();
        getMovieCredits();
        getMovieImages();
        getMovieVideos();
    }, [])

    return (
        <View>
            <Stack.Screen options={{ title: `${movie?.title}` }}></Stack.Screen>
            {
                movie && movieCredits && movieImages &&
                <ScrollView style={{ position: 'relative' }}>
                    <View style={styles.header}>
                        <ImageBackground style={styles.image} source={{ uri: `${PUBLIC_IMAGE_TMDB_URL}original/${movie.backdrop_path}` }} >
                            <LinearGradient colors={[`${theme.colors.DarkBlue}`, 'transparent']} style={styles.background} end={{ x: 0, y: 0 }} start={{ x: 0, y: 1 }}>
                                <View style={styles.dataContainer}>
                                    <StyledText fontSize="heading" fontWeight="bold">{movie.title}</StyledText>
                                    <StyledText>{movie.overview}</StyledText>
                                    <View>
                                        <ScrollView horizontal >
                                            {
                                                movie.genres.map(genre => (
                                                    <StyledText categorie key={genre.id}>
                                                        <Link href={`/genre/${genre.id}`}>
                                                            {genre.name}
                                                        </Link>
                                                    </StyledText>
                                                ))
                                            }
                                        </ScrollView>
                                    </View>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    </View>

                    <View style={styles.body}>
                        <StyledText fontWeight='bold'>Cast</StyledText>
                        <CastImageList />
                        <TrailerImageList />

                        <StyledText fontWeight='bold'>Trailer</StyledText>
                        <YoutubePlayer height={300} videoId={trailerMovie?.key} play={playing} onChangeState={onStateChange} />
                    </View>
                </ScrollView>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    dataContainer: {
        justifyContent: "flex-end",
        gap: 16,
        height: '100%',
        padding: 24,
    },

    image: {
        flex: 1
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },

    header: {
        height: 550,
    },

    body: {
        padding: 24,
        gap: 8,
        marginBottom: 16
    },

    castContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 24,
    },

    profilePicture: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden'
    },

    imageTrailer: {
        width: 360,
        aspectRatio: 16 / 9,
        marginRight: 24,
        position: 'relative'
    },

    fade: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 30,
        height: '100%',
        zIndex: 55,
    }
})



export default MovieDetails