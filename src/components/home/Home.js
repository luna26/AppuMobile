import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import News from './news/New';
import Menu from '../menu/menu';
import Header from '../header/header';
import BlurSectionCarrer from '../carrers/blurSectionCarrer';

class Home extends Component {
    setIndexSelected() {
        if (this.props.indexSelected == undefined) {
            return 1
        } else {
            return this.props.indexSelected;
        }
    }

    render() {
        console.log('montado el home');
        const { containerStyle, container1, container2, arrowUpStyle, imageUp } = styles;
        return (
            <View style={containerStyle}>
                <Header />
                <View style={{flex:1}}>
                    <News />
                </View>
                <Menu indexSelected={this.setIndexSelected()} />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    arrowUpStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    imageUp: {
        width: 50,
        height: 50
    }
}

export default Home;