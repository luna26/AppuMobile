import React, { Component } from 'react';
import { getInfo } from '../../actions';
import { connect } from 'react-redux';
import openMap from 'react-native-open-maps';
import call from 'react-native-phone-call'
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import Menu from '../menu/menu';
import Header from '../header/header';

class Info extends Component {
    componentWillMount() {
        this.props.getInfo();
    }

    openMap() {
        openMap({ latitude: 10.019339, longitude: -84.219206 });
    }

    returnViewLocation() {
        const { styleBtnMap, containerBtnText, mapImage, textBtnMap } = styles;
        return (
            <TouchableOpacity onPress={this.openMap} style={styleBtnMap}>
                <ImageBackground source={require('../../assets/images/map.png')} style={mapImage}>
                    <View style={containerBtnText}>
                        <Text style={textBtnMap}>Ubicacion</Text>
                    </View>
                </ImageBackground >
            </TouchableOpacity>
        );
    }

    makeCall() {
        const args = {
            number: '24309580', // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
        }

        call(args).catch(console.error)
    }

    returnCallButton() {
        const { btnCallContainer, textCallBtn } = styles;
        return (
            <TouchableOpacity onPress={this.makeCall} style={btnCallContainer}>
                <Text style={textCallBtn}>Llamar</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { containerStyle, } = styles;
        return (
            <View style={containerStyle}>
                <Header />
                <View style={containerStyle}>
                    {this.renderInfo()}
                </View>
                {this.returnViewLocation()}
                {this.returnCallButton()}
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
            const {ActivityIndicatorStyle} = styles;
            return (    
                <View style={ActivityIndicatorStyle}>
                    <ActivityIndicator size="large" color="rgba(61, 196, 255, 0.9)" />
                </View>
            );
        }
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    containerInfo: {
        flex: .8
    },
    containerInfoText: {
        backgroundColor: 'white',
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingTop: 15,
        paddingRight: 10
    },
    styleBtnMap: {
        flex: .2,
        marginLeft: 10,
        marginRight: 10
    },
    containerBtnText: {
        backgroundColor: 'white',
        alignSelf: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 50
    },
    mapImage: {
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    textBtnMap: {
        color: 'rgba(61, 196, 255, 0.9)',
        fontSize: 15
    },
    btnCallContainer: {
        flex: .2,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'rgba(61, 196, 255, 0.9)',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 100
    },
    textCallBtn: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 25,
    },
    ActivityIndicatorStyle:{
        flex: 1,
        justifyContent: 'center',
    }
}

const mapStateToProps = ({ info }) => {
    return {
        info: info
    };
};

export default connect(mapStateToProps, { getInfo })(Info);