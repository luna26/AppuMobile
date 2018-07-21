import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

const CarrerItem = ({ iconCarrer, label, imageCarrer, onClcikItem, idItem }) => {
    const {iconImageStyle, imageContainer, textStyle} = styles;
    return (
        <TouchableOpacity style={imageContainer} onPress={onClcikItem.bind(this, idItem)}>
            <Image  resizeMode='stretch' style={iconImageStyle} source={{uri:imageCarrer}} />
            <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
    );
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