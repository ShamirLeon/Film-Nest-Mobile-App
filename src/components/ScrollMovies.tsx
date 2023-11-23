import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Link } from 'react-router-native'
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
                    movies && movies.map(movie => (
                        <Link to={`/movieDetails/${movie.id}`} key={movie.id}>
                            <Image style={styles.ratedMovie} source={{ uri: `${PUBLIC_IMAGE_TMDB_URL}w342${movie.poster_path}` }}></Image>
                        </Link>
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
        width: 186,
        height: 279,
        marginRight: 24,
        backgroundColor: '#ee33ff44'
    }
})