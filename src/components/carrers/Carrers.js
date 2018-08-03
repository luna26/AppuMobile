import React, { Component } from 'react';
import { Text, Image, TouchableOpacity, ScrollView, View, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { onLoadCareers, showCareerDetail, getSpecificCareer, closeBlurSection } from '../../actions';
import CarrerItem from './carrerItem';
import Header from '../header/header';
import Menu from '../menu/menu';
import BlurSectionCarrer from './blurSectionCarrer';
import Carousel from 'react-native-snap-carousel';

class Carrers extends Component {
    componentDidMount() {
        if (this.props.careers.infoCareers == null) {
            this.props.onLoadCareers();
        }
    }

    clickCareer(id) {
        this.props.showCareerDetail(id);
    }

    closeBlurSection() {
        this.props.closeBlurSection();
    }

    returnTemplateCareer() {
        if (this.props.careers.careerDetail) {
            return <BlurSectionCarrer idCareer={this.props.careers.careerDetail} closeBlur={this.closeBlurSection.bind(this)} objCareer={this.props.careers.infoObjCareer} />;
        }
    }

    // renderCarrers() {
    //     const { containerActivity, containerIconsStyle } = styles;
    //     if (this.props.careers.infoCareers) {
    //         const SERVER_URL = 'http://34.219.69.51';
    //         return (
    //             <ScrollView removeClippedSubviews={true} contentContainerStyle={containerIconsStyle} showsHorizontalScrollIndicator={false} horizontal={true} >
    //                 {

    //                     this.props.careers.infoCareers.map(function (item, index) {
    //                         return (
    //                             <CarrerItem key={index} idItem={item.careers_id} onClcikItem={this.clickCareer.bind(this)} label={item.careers_title} imageCarrer={SERVER_URL + item.careers_url_img} />
    //                         );
    //                     }.bind(this))

    //                 }
    //             </ScrollView>
    //         );
    //     } else {
    //         return (
    //             <View style={containerActivity}>
    //                 <ActivityIndicator size="large" color="#3dc4ff" />
    //             </View>
    //         );
    //     }
    // }

    render() {
        const { containerStyle, textStyle, containerStyleMain, containerIconsStyle, containerScrollView, containerScrollViewMain } = styles;
        return (
            <View style={containerStyleMain}>
                <Header />
                <View style={containerScrollViewMain}>
                    {/* {this.renderCarrers()} */}
                    {this.returnCarousel()}
                </View>
                <Menu indexSelected={this.props.indexSelected} />
                {this.returnTemplateCareer()}
            </View>
        );
    }

    _renderItem({ item, index }) {
        const SERVER_URL = 'http://34.219.69.51';
        let { height, width } = Dimensions.get('window');
        const { snapCarouselItemTitle, snapCarouselItemTitleText, iconInfoContainerStyle } = styles;
        return (
            <View>
                <Image resizeMode='stretch' style={{ width: width, height: 230 }} source={{ uri: SERVER_URL + item.careers_url_img }} />
                <View style={snapCarouselItemTitle}>
                    <Text style={snapCarouselItemTitleText}>{item.careers_title}</Text>
                </View>
                <TouchableOpacity onPress={this.clickCareer.bind(this, item.careers_id)} style={iconInfoContainerStyle}>
                    <Image style={{ width: 60, height: 60 }} source={require('../../assets/icons/info_careers.png')} />
                </TouchableOpacity>
            </View>
        );
    }

    returnCarousel() {
        if (this.props.careers.infoCareers) {
            let { height, width } = Dimensions.get('window');
            const { snapCarouselItemContainer } = styles;
            return (
                <View style={snapCarouselItemContainer}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.props.careers.infoCareers}
                        renderItem={this._renderItem.bind(this)}
                        sliderWidth={width}
                        itemWidth={width - 20}
                    />
                </View>
            );
        } else {
            const {containerActivity} = styles;
            return (
                <View style={containerActivity}>
                    <ActivityIndicator size="large" color="#3dc4ff" />
                </View>
            );
        }
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
        justifyContent: 'center',
    },
    containerActivity: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    //SNAP CAROUSEL
    snapCarouselItemContainer: {
        marginRight: 10
    },
    snapCarouselItemTitle: {
        height: 70,
        paddingLeft: 10,
        justifyContent: 'center',
        backgroundColor: '#4fc3f7',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    snapCarouselItemTitleText: {
        fontSize: 15,
        color: 'white'
    },
    iconInfoContainerStyle: {
        position: 'absolute',
        bottom: 7,
        right: 5,
        width: 60,
        height: 60
    }

}

const mapStateToProps = ({ careers }) => {
    return {
        careers: careers
    };
};

export default connect(mapStateToProps, { onLoadCareers, showCareerDetail, getSpecificCareer, closeBlurSection })(Carrers);