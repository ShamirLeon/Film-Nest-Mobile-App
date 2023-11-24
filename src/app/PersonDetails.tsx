import { View, ImageBackground, StyleSheet } from 'react-native'
import { useParams } from 'react-router-native'
import React, { useEffect, useState } from 'react'
import StyledText from '../components/StyledText'
import AxiosConfig from '../axios-config'
import { IPersonDetails } from '../types/movies.interface'
import { PUBLIC_IMAGE_TMDB_URL } from '@env'
import { LinearGradient } from 'expo-linear-gradient'

const PersonDetails = () => {
    const { personId } = useParams();
    const [person, setPerson] = useState<IPersonDetails>()

    /* Function to get person details */

    const getPersonDetails = async () => {
        try {
            const { data } = await AxiosConfig(`/person/${personId}`)
            setPerson(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPersonDetails()
    }, [])

    return (
        <View>
            <ImageBackground style={styles.image} source={{
                uri: `${PUBLIC_IMAGE_TMDB_URL}w780${person?.profile_path}`
            }}>
                <LinearGradient colors={['#11181D', 'transparent']} style={styles.background} end={{ x: 0, y: 0 }} start={{ x: 0, y: 1 }}>
                    <View style={styles.textContainer}>
                        <StyledText fontSize='heading' fontWeight='bold'>{person?.name}</StyledText>
                        <StyledText color='accent'>{person?.place_of_birth}</StyledText>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <View style={styles.mainContent}>
                <StyledText>{person?.biography}</StyledText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 550
    },

    background: {
        height: '100%',
    },

    textContainer: {
        height: '100%',
        justifyContent: 'flex-end',
        gap: 8,
        padding: 24
    },

    mainContent: {
        paddingHorizontal: 24
    }
})

export default PersonDetails