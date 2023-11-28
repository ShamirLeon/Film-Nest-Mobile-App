import { Text, StyleSheet } from 'react-native'
import theme from '../theme';
import { useFonts } from 'expo-font';


interface ITextProps {
    children?: any,
    color?: 'accent',
    fontSize?: 'heading' | 'subheading',
    fontWeight?: 'bold',
    style?: any,
    restofProps?: any,
    categorie?: any
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

    categorie: {
        fontSize: 16,
        padding: 10,
        backgroundColor: '#ffffff33',
        borderRadius: 4,
        textTransform: "uppercase",
        marginRight: 16
    },
})


export default function StyledText({ children, color, fontSize, fontWeight, style, categorie, ...restofProps }: ITextProps) {
    let [fontsLoaded, fontError] = useFonts({
        Figtree: require('../../assets/fonts/static/Figtree-Regular.ttf'),
        FigtreeBold: require('../../assets/fonts/static/Figtree-Bold.ttf'),
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }
    const textStyles: any[] = [
        styles.text,
        style,
        color === 'accent' && styles.accent,
        fontSize === 'heading' && styles.heading,
        fontSize === 'subheading' && styles.subheading,
        fontWeight === 'bold' && styles.bold,
        categorie && styles.categorie,
    ];

    return (
        <Text style={textStyles} {...restofProps} numberOfLines={5} ellipsizeMode="tail">{children}</Text>
    )
}
