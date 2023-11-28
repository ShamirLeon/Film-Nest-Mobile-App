import { View, StyleSheet } from 'react-native'
import React from 'react'
import MovieDetails from './[movieID]'
import theme from '../../src/theme'

const _layout = () => {
    return (
        <View style={styles.container}>
            <MovieDetails />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.DarkBlue
    }
})

export default _layout