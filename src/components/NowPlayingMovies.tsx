import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { Link } from "react-router-native";
import { useState, useEffect, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient'

import { IResult } from '../types/movies.interface';
import { PUBLIC_IMAGE_TMDB_URL } from '@env';

import StyledText from "./StyledText";
import AxiosConfig from "../axios-config";
import { MovieContext } from "../context/MovieContext";
import ScrollMovies from "./ScrollMovies";


export default function TopRatedMovies() {

    const [nowPlayingMovies, setNowPlayingMovies] = useState<IResult[]>();
    const [movie, setMovie] = useState<number>(0);
    const { genresMap }: any = useContext(MovieContext)

    const getData = async () => {
        const { data } = await AxiosConfig('/movie/now_playing?page=1');
        setNowPlayingMovies(data.results)
    }

    const switchMovie = () => {
        const randomNum = Math.floor(Math.random() * 20);
        setMovie(randomNum)
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            switchMovie();
        }, 15000);
    }, [movie])

    return (
        <>
            {
                nowPlayingMovies &&
                <View style={styles.container}>
                    <View style={styles.moviesContainer}>
                        <ImageBackground style={styles.image} source={{ uri: `${PUBLIC_IMAGE_TMDB_URL}original/${nowPlayingMovies[movie].backdrop_path}` }}></ImageBackground>
                        <LinearGradient colors={['#11181D', 'transparent']} style={styles.background} end={{ x: 0, y: 0 }} start={{ x: 0, y: 1 }}>
                            <View style={styles.dataContainer}>
                                <Link to={`/movieDetails/${nowPlayingMovies[movie].id}`} touchSoundDisabled>
                                    <StyledText fontSize="heading" fontWeight="bold">{nowPlayingMovies[movie].title}</StyledText>
                                </Link>
                                <StyledText>{nowPlayingMovies[movie].overview}</StyledText>
                                <View>
                                    <ScrollView horizontal >
                                        {
                                            nowPlayingMovies[movie].genre_ids.map(genre => (
                                                <Link to={`/genre/${genre}`} key={genre} >
                                                    <StyledText categorie>{genresMap.get(genre)} </StyledText>
                                                </Link>
                                            ))
                                        }
                                    </ScrollView>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                    <ScrollMovies movies={nowPlayingMovies} title="Now Playing"></ScrollMovies>
                </View>
            }
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    moviesContainer: {
        height: 550,
        fontSize: 24,
    },

    dataContainer: {
        justifyContent: "flex-end",
        gap: 16,
        height: '100%',
        padding: 24,
    },

    image: {
        width: '100%',
        height: '100%',
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },

})