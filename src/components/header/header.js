import React from 'react';
import {
    View,
    Image,
    Text,
    StatusBar
} from 'react-native';

const Header = () => {
    const {
        containerLogo,
        headerText,
        headerTextContainer
    } = styles;

    return (
        <View>
            <StatusBar
                backgroundColor='#0288D1'
                barStyle="light-content"
            />
            <View style={containerLogo}>
                <Image
                    resizeMode='stretch'
                    style={{ height: 150, width: 150 }}
                    source={require('../../assets/images/Logo-ucem-2.png')}
                />
            </View>
            <View style={headerTextContainer}>
                <Text style={headerText}>
                    Somos la Universidad de Alajuela
                </Text>
            </View>
        </View>
    );
}

const styles = {
    containerLogo: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 100,
        justifyContent: 'center',
        backgroundColor: '#3dc4ff'

    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headerTextContainer: {
        borderTopColor: '#0288D1',
        borderTopWidth: 2,
        backgroundColor: '#3dc4ff',
        height: 30,
        justifyContent: 'center'
    }
}

export default Header;