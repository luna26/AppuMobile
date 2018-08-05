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
        const { containerStyle } = styles;
        return (
            <View style={containerStyle}>
                <Header />
                <View style={containerStyle}>
                    <News />
                </View>
                <Menu indexSelected={this.setIndexSelected()} />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        //backgroundColor:'#455A64'
    }
}

export default Home;