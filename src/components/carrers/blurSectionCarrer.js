import React, {Component} from 'react';
import {View, Text} from 'react-native';

class BlurSectionCarrer extends Component{
    render(){
        const {blurContainer, blurSubContainer} = styles;
        return(
            <View style={blurContainer}>
                <View style={blurSubContainer}>
                </View>
            </View>
        );
    }
}

const styles = {
    blurContainer:{
        position:'absolute',
        backgroundColor:'rgba(61, 196, 255, 0.9)',
        left:0,
        right:0,
        top:0,
        bottom:0,
        justifyContent:'center'
    },
    blurSubContainer:{
        backgroundColor:'white',
        flex:0.75,
        marginLeft:40,
        marginRight:40,
        borderRadius:50
    }
}
export default BlurSectionCarrer;