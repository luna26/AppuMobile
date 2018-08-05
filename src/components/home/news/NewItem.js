import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class NewItem extends Component {
    render() {
        const { titleNew, dateNew, descNew, imageUrl } = this.props;
        const { contianerNewsStyle, newStyle, textStyleNews, dateStyle, descStyle } = styles;
        return (
            <View style={contianerNewsStyle}>
                <Text style={textStyleNews}>{titleNew}</Text>
                <Text style={dateStyle}>{dateNew}</Text>
                <Image style={newStyle} source={{ uri: imageUrl }} />
                <Text style={descStyle}>{descNew}</Text>
            </View>
        );
    }
}

const styles = {
    contianerNewsStyle: {
        flex: 1,
        marginBottom: 15,
        marginTop: 15,
        paddingBottom:10,
        backgroundColor:'white',
        borderRadius:5,
        borderColor: '#455A64',
        borderWidth: .5,
    },
    newStyle: {
        resizeMode: 'stretch',
        width: null,
        height: 250,
        marginLeft: 15,
        marginRight: 15,
    },
    textStyleNews: {
        fontSize: 20,
        marginTop: 15,
        marginLeft: 15,
        color:'black'
    },
    dateStyle: {
        fontSize: 14,
        marginLeft: 15,
        marginBottom: 10
    },
    descStyle:{
        marginLeft:5,
        marginTop:10
    }
}

export default NewItem;