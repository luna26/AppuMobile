import React, { Component } from 'react';
import { Text, Image, TouchableOpacity, ScrollView } from 'react-native';

class Icon extends Component {
    render() {
        const { contianerIconStyle, containerImageIcon, textStyle } = styles;
        return (
            <TouchableOpacity style={contianerIconStyle}>
                <Image source={require('../../../assets/icons/carrers.png')} />
                <Text style={textStyle}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = {
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

export default Icon;