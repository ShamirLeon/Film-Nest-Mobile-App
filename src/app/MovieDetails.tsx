import { useCallback, useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native'
import { Link, useParams } from 'react-router-native'
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe'
import StyledText from '../components/StyledText';


import AxiosConfig from '../axios-config';
import { PUBLIC_IMAGE_TMDB_URL } from '@env'
import { IMovieDetails, IMovieCredits, IMovieImages, IVideo, IMovieVideos, Type } from '../types/movies.interface';

import { MovieContext } from '../context/MovieContext';

const MovieDetails = () => {
    let { movieId } = useParams();

    const [movie, setMovie] = useState<IMovieDetails>();
    const [movieCredits, setMovieCredits] = useState<IMovieCredits>();
    const [movieImages, setMovieImages] = useState<IMovieImages>();
    const [movieVideos, setMovieVideos] = useState<IVideo[]>();

    const { genresMap }: any = useContext(MovieContext)

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);


    const getMovieDetails = async () => {
        try {
            const response = await AxiosConfig(`/movie/${movieId}`)
            setMovie(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    /* Function to get movie credits and filter cast with no null profile path */
    const getMovieCredits = async () => {
        try {
            const response = await AxiosConfig(`/movie/${movieId}/credits`)
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
            const response = await AxiosConfig(`/movie/${movieId}/images`)
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
            const response = await AxiosConfig(`/movie/${movieId}/videos?language=es-ES`);
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
                        <Image key={person.id} style={styles.profilePicture} source={{ uri: `${PUBLIC_IMAGE_TMDB_URL}w780/${person.profile_path}` }}></Image>
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
        <View style={{ marginTop: 32 }}>
            {
                movie && movieCredits && movieImages &&
                <ScrollView style={{ position: 'relative' }}>
                    <View style={styles.back}>
                        <Link to={'/'}>
                            <Text > B </Text>
                        </Link>
                    </View>
                    <View style={styles.header}>
                        <ImageBackground style={styles.image} source={{ uri: `${PUBLIC_IMAGE_TMDB_URL}original/${movie.backdrop_path}` }} >
                            <LinearGradient colors={['#11181D', 'transparent']} style={styles.background} end={{ x: 0, y: 0 }} start={{ x: 0, y: 1 }}>
                                <View style={styles.dataContainer}>
                                    <StyledText fontSize="heading" fontWeight="bold">{movie.title}</StyledText>
                                    <StyledText>{movie.overview}</StyledText>
                                    <View>
                                        <ScrollView horizontal >
                                            {
                                                movie.genres.map(genre => (
                                                    <Link to={`/genre/${genre.id}`} key={genre.id}>
                                                        <StyledText categorie>{genresMap.get(genre.id)} </StyledText>
                                                    </Link>
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

    categorie: {
        padding: 10,
        backgroundColor: '#ffffff33',
        borderRadius: 4,
        textTransform: "uppercase",
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
    },

    imageTrailer: {
        width: 360,
        aspectRatio: 16 / 9,
        marginRight: 24,
        position: 'relative'
    },

    back: {
        position: 'absolute',
        top: 24,
        left: 24,
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#8282826c',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50
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