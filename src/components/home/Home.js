import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import News from './news/New';
import Menu from '../menu/menu';
import Header from '../header/header';
import BlurSectionCarrer from '../carrers/blurSectionCarrer';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            refsNews: null
        }

        this.getRefsFromChild = this.getRefsFromChild.bind(this);
    }

    setIndexSelected() {
        if (this.props.indexSelected == undefined) {
            return 1
        } else {
            return this.props.indexSelected;
        }
    }

    getRefsFromChild(refs) {
        this.setState({ refsNews: refs });
    }

    onClickTop() {
        this.state.refsNews._scrollViewNews.scrollTo({ x: 0, y: 0, animated: true });
    }

    render() {
        const { containerStyle, container1, container2, arrowUpStyle, imageUp } = styles;
        return (
            <View style={containerStyle}>
                <View style={{flex:1}}>
                    <News passRefUpward={this.getRefsFromChild} />
                    <TouchableOpacity style={arrowUpStyle} onPress={this.onClickTop.bind(this)}>
                        <Image style={imageUp} source={require('../../assets/icons/up.png')} />
                    </TouchableOpacity>
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