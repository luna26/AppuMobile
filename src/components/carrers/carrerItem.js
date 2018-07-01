import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

const CarrerItem = ({ iconCarrer, label }) => {
    const {iconImageStyle, imageContainer, textStyle} = styles;
    return (
        <TouchableOpacity style={imageContainer}>
            <Image  resizeMode='stretch' style={iconImageStyle} source={seletectedIcon(iconCarrer)} />
            <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
    );
}

const seletectedIcon = (iconCarrer) => {
    switch (iconCarrer) {
        case 'systems':
            return require('../../assets/images/computer.png');
            break;
        case 'admin':
            return require('../../assets/images/admin.png');
            break;
        case 'bilin':
            return require('../../assets/images/bilin.png');
            break;
        case 'economy':
            return require('../../assets/images/economy.png');
            break;
        case 'industrial':
            return require('../../assets/images/industrial.png');
            break;
        case 'pres':
            return require('../../assets/images/pres.png');
            break;

    }
}

const styles = {
    imageContainer:{
        marginRight:30,
        marginLeft:30,
        alignItems:'center',
        flex:1
    },
    iconImageStyle:{
        height:200,
        width:230,
    },
    textStyle:{
        fontSize:20,
        textAlign: 'center',
        marginTop:10
    }
}

export default CarrerItem;