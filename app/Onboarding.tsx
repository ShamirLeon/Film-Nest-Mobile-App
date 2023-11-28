import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { Stack, router } from 'expo-router'
import StyledText from '../src/components/StyledText'
import theme from '../src/theme'

import { MaterialIcons } from '@expo/vector-icons'

export default function Onboarding() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false, statusBarStyle: 'dark' }}></Stack.Screen>

            <ImageBackground style={styles.imageBackground} source={require('../assets/background.png')}></ImageBackground>

            <View style={styles.textContainer}>
                <StyledText fontWeight='bold' style={styles.title}>Film Nest</StyledText>
                <StyledText style={styles.description}>Explore, discover, and enjoy the world of movies with Film Nest, your go-to app for detailed movie information and trailers.</StyledText>
            </View>

            <TouchableWithoutFeedback onPress={() => {
                router.push('/Home')
            }}>
                <View style={styles.button}>
                    <StyledText>
                        Continue
                    </StyledText>
                    <MaterialIcons name='arrow-forward-ios' style={{ fontSize: 24, color: 'white' }}></MaterialIcons>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        backgroundColor: theme.colors.DarkBlue,
    },

    textContainer: {
        paddingHorizontal: 24
    },

    title: {
        fontSize: 80,
        lineHeight: 95,
        textAlign: 'center',
        marginBottom: 24,
    },

    description: {
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 45
    },

    button: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.AccentBlue,
        overflow: 'hidden'
    },

    background: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
    },

    imageBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
})