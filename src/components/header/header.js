import React from 'react';
import { View, Image, Text } from 'react-native';

const Header = () => {
    const { containerLogo, logoStyle, textStyle } = styles;
    return (
        <View style={containerLogo}>
            <Image style={logoStyle} source={require('../../assets/images/Logo-ucem.png')} />
            <Text style={textStyle}>Universidad de Ciencias Empresariales</Text>
        </View>
    );
}

const styles = {
    containerLogo: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 180,
        justifyContent: 'center',
        borderBottomColor: '#179bd7',
        borderBottomWidth: 6

    },
    logoStyle: {
        //height: 60,
        //width:100,
    },
    textStyle: {
        color: '#179bd7',
        fontSize: 20,
        margin: 5,
        fontWeight: 'bold',
        textAlign:'center'
    }
}

export default Header;