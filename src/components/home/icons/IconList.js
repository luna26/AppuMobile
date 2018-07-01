import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import Icon from './Icon';

class IconList extends Component {
    render() {
        const { contianerIconStyle, contianerIconListStyle, textStyle } = styles;
        return (
            <ScrollView
                contentContainerStyle={contianerIconListStyle}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity style={contianerIconStyle} onPress={Actions.carrers}>
                    <Image source={require('../../../assets/icons/carrers.png')} />
                    <Text style={textStyle}>Carreras</Text>
                </TouchableOpacity>
                <TouchableOpacity style={contianerIconStyle}>
                    <Image source={require('../../../assets/icons/info.png')} />
                    <Text style={textStyle}>Informacion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={contianerIconStyle}>
                    <Image source={require('../../../assets/icons/calendar.png')} />
                    <Text style={textStyle}>Calendario</Text>
                </TouchableOpacity>
                <TouchableOpacity style={contianerIconStyle}>
                    <Image source={require('../../../assets/icons/contacts.png')} />
                    <Text style={textStyle}>Contacto</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = {
    contianerIconListStyle: {

    },
    contianerIconStyle: {
        justifyContent: 'center',
        backgroundColor: 'white',
        marginLeft:20,
        marginRight:20,
        borderRadius: 20,
        padding:20
    },
    textStyle:{
        textAlign:'center',
        marginTop:5
    }
}

export default IconList;