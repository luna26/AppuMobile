import React, { Component } from 'react';
import { getInfo } from '../../actions';
import { connect } from 'react-redux';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Menu from '../menu/menu';
import Header from '../header/header';

class Info extends Component {
    componentWillMount() {
        this.props.getInfo();
    }

    render() {
        const { containerStyle, } = styles;
        return (
            <View style={containerStyle}>
                <Header />
                <View style={containerStyle}>
                    {this.renderInfo()}
                </View>
                <Menu indexSelected={this.props.indexSelected} />
            </View>
        );
    };

    renderInfo() {
        if (this.props.info.infoObj) {
            const { containerInfoText } = styles;
            return (
                <ScrollView style={containerInfoText}>
                    <Text>
                        {this.props.info.infoObj[0].info_details};
                    </Text>
                </ScrollView>
            );
        } else {
            <View style={onLoadContainer}>
                <ActivityIndicator size="large" color="rgba(61, 196, 255, 0.9)" />
            </View>
        }
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    containerInfoText: {
        backgroundColor: 'white',
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingTop: 15,
        paddingRight: 10
    }
}

const mapStateToProps = ({ info }) => {
    return {
        info: info
    };
};

export default connect(mapStateToProps, { getInfo })(Info);