import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Link } from 'expo-router'
import { IResult } from "../types/movies.interface";
import { PUBLIC_IMAGE_TMDB_URL } from '@env';
import StyledText from "./StyledText";

interface Props {
    movies: IResult[],
    title: string
}

export default function ScrollMovies({ movies, title }: Props) {

    return (
        <View style={styles.container}>
            <StyledText fontSize="subheading" fontWeight="bold">{title}</StyledText>
            <ScrollView horizontal>
                {
                    movies.map(movie => (
                        <ImageBackground key={movie.id} style={styles.image} source={{ uri: `${PUBLIC_IMAGE_TMDB_URL}w342${movie.poster_path}` }}>
                            <Link href={`/movieDetails/${movie.id}`} style={styles.ratedMovie}></Link>
                        </ImageBackground>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        paddingVertical: 40,
        paddingHorizontal: 24,
    },

    ratedMovie: {
        width: '100%',
        aspectRatio: 9 / 16,
    },

    image: {
        width: 200,
        aspectRatio: 9 / 16,
        marginRight: 24,
    }
})