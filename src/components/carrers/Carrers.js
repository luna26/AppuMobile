import React, { Component } from 'react';
import { Text, Image, TouchableOpacity, ScrollView, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { onLoadCareers, showCareerDetail, getSpecificCareer, closeBlurSection } from '../../actions';
import CarrerItem from './carrerItem';
import Header from '../header/header';
import Menu from '../menu/menu';
import BlurSectionCarrer from './blurSectionCarrer';

class Carrers extends Component {
    componentWillMount() {
        this.props.onLoadCareers();
    }

    clickCareer(id){
        this.props.showCareerDetail(id);
    }

    closeBlurSection(){
        this.props.closeBlurSection();
    }

    returnTemplateCareer(){
        if(this.props.careers.careerDetail){
            return <BlurSectionCarrer idCareer={this.props.careers.careerDetail} closeBlur={this.closeBlurSection.bind(this)} objCareer={this.props.careers.infoObjCareer}/>;   
        }
    }
    
    renderCarrers() {
        const { containerActivity, containerIconsStyle } = styles;
        if (this.props.careers.infoCareers) {
            const SERVER_URL = 'http://34.219.69.51';
            return (
                <ScrollView contentContainerStyle={containerIconsStyle} showsHorizontalScrollIndicator={false} horizontal={true} >
                    {

                        this.props.careers.infoCareers.map(function (item, index) {
                            return (
                                <CarrerItem key={index} idItem={item.careers_id} onClcikItem={this.clickCareer.bind(this)} label={item.careers_title} imageCarrer={SERVER_URL + item.careers_url_img} />
                            );
                        }.bind(this))

                    }
                </ScrollView>
            );
        } else {
            return (
                <View style={containerActivity}>
                    <ActivityIndicator size="large" color="#3dc4ff" />
                </View>
            );
        }
    }
    render() {
        const { containerStyle, textStyle, containerStyleMain, containerIconsStyle, containerScrollView, containerScrollViewMain } = styles;
        return (
            <View style={containerStyleMain}>
                <Header />
                <View style={containerScrollViewMain}>
                    {this.renderCarrers()}
                </View>
                <Menu indexSelected={this.props.indexSelected} />
                {this.returnTemplateCareer()}
            </View>
        );
    }
}

const styles = {
    containerStyleMain: {
        backgroundColor: 'white',
        flex: 1,
    },
    containerStyle: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3dc4ff',
        padding: 15,
        marginBottom: 15
    },
    textStyle: {

    },
    containerIconsStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerScrollView: {
        flex: 0.8
    },
    containerScrollViewMain: {
        flex: 1,
        justifyContent: 'center'
    },
    containerActivity: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    }
}

const mapStateToProps = ({ careers }) => {
    return {
        careers: careers
    };
};

export default connect(mapStateToProps, { onLoadCareers, showCareerDetail, getSpecificCareer, closeBlurSection })(Carrers);