import { View } from 'react-native'
import React from 'react'
import PersonDetails from './[personID]'
import theme from '../../src/theme'

const _layout = () => {
    return (
        <View style={theme.container}>
            <PersonDetails />
        </View>
    )
}

export default _layout