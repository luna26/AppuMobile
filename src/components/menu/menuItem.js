import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

const MenuItem = ({ label, onPress, iconSelected, index, indexSelected }) => {
    const { itemContainer, imageStyle, textStyle } = styles;
    return (
        <TouchableOpacity style={itemContainer} onPress={onPress.bind(this, index)}>
            <Image style={imageStyle} source={renderIconSelected(iconSelected, indexSelected)} />
            <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
    );
}
 
const renderIconSelected = (icon, indexSelected) => {
    switch (icon) {
        case 'home':
            if (1 == indexSelected) {
                return require('../../assets/icons/home2.png');
            } else {
                return require('../../assets/icons/home.png');
            }
        case 'carrers':
            if (2 == indexSelected) {
                return require('../../assets/icons/carrers2.png');
            } else {
                return require('../../assets/icons/carrers1.png');
            }
        case 'events':
            if (3 == indexSelected) {
                return require('../../assets/icons/calendar2.png');
            } else {
                return require('../../assets/icons/calendar1.png');
            }
        case 'contact':
            if (4 == indexSelected) {
                return require('../../assets/icons/contact2.png');
            } else {
                return require('../../assets/icons/contact.png');
            }
        case 'info':
            if (5 == indexSelected) {
                return require('../../assets/icons/info2.png');
            } else {
                return require('../../assets/icons/info1.png');
            }
        case 'calc':
        if (6 == indexSelected) {
            return require('../../assets/icons/calc.png');
        } else {
            return require('../../assets/icons/calc.png');
        }
    }
}

const styles = {
    itemContainer: {
        alignItems: 'center'
    },
    imageStyle: {
        width: 40,
        height: 40
    },
    textStyle: {
        textAlign: 'center'
    }
}

export default MenuItem;