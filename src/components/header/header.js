import React from 'react';
import { View, Image } from 'react-native';

const Header = () => {
    const { 
        containerLogo, 
        textStyle 
    } = styles;

    return (
        <View style={containerLogo}>
            <Image resizeMode='stretch' style={{height:35, width:130}} source={require('../../assets/images/Logo-ucem.png')} />
        </View>
    );
}

const styles = {
    containerLogo: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 75,
        justifyContent: 'center',
        borderBottomColor: '#179bd7',
        borderBottomWidth: 2

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