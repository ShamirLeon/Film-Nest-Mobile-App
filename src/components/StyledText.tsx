import { Text, StyleSheet } from 'react-native'
import theme from '../theme';
import { useFonts } from 'expo-font';


interface ITextProps {
    children?: any,
    color?: string,
    fontSize?: 'heading' | 'subheading',
    fontWeight?: 'bold',
    style?: any,
    restofProps?: any
}

const styles = StyleSheet.create({
    text: {
        color: theme.colors.White,
        fontSize: theme.fontSizes.body,
        fontFamily: 'Figtree',
    },

    accent: {
        color: theme.colors.AccentBlue
    },

    bold: {
        fontFamily: 'FigtreeBold'
    },

    heading: {
        fontSize: theme.fontSizes.heading,
    },

    subheading: {
        fontSize: theme.fontSizes.subheading
    },
})


export default function StyledText({ children, color, fontSize, fontWeight, style, ...restofProps }: ITextProps) {
    let [fontsLoaded, fontError] = useFonts({
        Figtree: require('../../assets/fonts/static/Figtree-Regular.ttf'),
        FigtreeBold: require('../../assets/fonts/static/Figtree-Bold.ttf'),
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }
    const textStyles: any[] = [
        styles.text,
        color === 'accent' && styles.accent,
        fontSize === 'heading' && styles.heading,
        fontSize === 'subheading' && styles.subheading,
        fontWeight === 'bold' && styles.bold
    ];

    return (
        <Text style={textStyles} {...restofProps} numberOfLines={5} ellipsizeMode="tail">{children}</Text>
    )
}
