import React, { Component } from 'react';
import { Text, Image, TouchableOpacity, ScrollView, View } from 'react-native';
import CarrerItem from './carrerItem';
import Header from '../header/header';
import Menu from '../menu/menu';

class Carrers extends Component { 
    render() {
        const { contianerStyle, textStyle, contianerStyleMain, containerIconsStyle, containerScrollView, containerScrollViewMain } = styles;
        return (
            <View style={contianerStyleMain}>
                <Header />
                <View style={containerScrollViewMain}>
                        <ScrollView contentContainerStyle={containerIconsStyle} showsHorizontalScrollIndicator={false} horizontal={true} >
                            <CarrerItem label={'Ingenieria en Sistemas'} icon={'systems'} iconCarrer={'systems'} />
                            <CarrerItem label={'Ingenieria Industrial'} icon={'systems'} iconCarrer={'industrial'} />
                            <CarrerItem label={'Contaduría Pública'} icon={'systems'} iconCarrer={'economy'} />
                            <CarrerItem label={'Educación Bilingüe'} icon={'systems'} iconCarrer={'bilin'} />
                            <CarrerItem label={'Administración de Negocios'} icon={'systems'} iconCarrer={'admin'} />
                            <CarrerItem label={'Educación Preescolar'} icon={'systems'} iconCarrer={'pres'} />
                        </ScrollView>
                </View>
                <Menu indexSelected={this.props.indexSelected}/>
            </View>
        );
    }
}

const styles = {
    contianerStyleMain: {
        backgroundColor: 'white',
        flex: 1,
    },
    contianerStyle: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3dc4ff',
        padding: 15,
        marginBottom: 15
    },
    textStyle: {

    },
    containerIconsStyle: {
        justifyContent:'center',
        alignItems:'center',
    },
    containerScrollView: {
        flex: 0.8
    },
    containerScrollViewMain:{
        flex:1,
        justifyContent:'center'
    }
}

export default Carrers;