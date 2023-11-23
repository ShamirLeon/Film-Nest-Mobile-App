import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient'

import { IResult } from '../types/movies.interface';
import { PUBLIC_IMAGE_TMDB_URL } from '@env';

import StyledText from "./StyledText";
import ScrollMovies from "./ScrollMovies";
import AxiosConfig from "../axios-config";


export default function TopRatedMovies() {

    const [ratedMovies, setRatedMovies] = useState<IResult[]>();
    const [movie, setMovie] = useState<number>(0);

    const getData = async () => {
        const response = await AxiosConfig('/movie/top_rated?language=en-US&page=2');
        setRatedMovies(response.data.results)
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
                ratedMovies &&
                <View style={styles.container}>
                    <View style={styles.moviesContainer}>
                        <ImageBackground style={styles.image} source={{ uri: `${PUBLIC_IMAGE_TMDB_URL}original/${ratedMovies[movie].backdrop_path}` }}></ImageBackground>
                        <LinearGradient colors={['#11181D', 'transparent']} style={styles.background} end={{ x: 0, y: 0 }} start={{ x: 0, y: 1 }}>
                            <View style={styles.dataContainer}>
                                <StyledText fontSize="heading" fontWeight="bold">{ratedMovies[movie].title}</StyledText>
                                <StyledText>{ratedMovies[movie].overview}</StyledText>
                                <View style={styles.categories}>
                                    <Text style={styles.categorie} >Action </Text>
                                    <Text style={styles.categorie} >Adventure </Text>
                                    <Text style={styles.categorie} >Sci-Fi</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>

                    <ScrollMovies movies={ratedMovies} title="Top Rated"></ScrollMovies>
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
        position: "absolute",
    },

    categories: {
        flexDirection: "row",
        gap: 16,
    },

    categorie: {
        color: '#fff',
        padding: 10,
        backgroundColor: '#ffffff33',
        borderRadius: 4,
        textTransform: "uppercase"
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },

})