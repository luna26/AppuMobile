import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLoadCareers, showCareerDetail, closeBlurSection } from '../../actions';
import { Text, Image, TouchableOpacity, View, ActivityIndicator, Dimensions } from 'react-native';
import Header from '../header/header';
import Menu from '../menu/menu';
import BlurSectionCarrer from './blurSectionCarrer';
import Carousel from 'react-native-snap-carousel';
import { SERVER_DIR } from '../../Config';

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
            return (
                <BlurSectionCarrer
                    idCareer={this.props.careers.careerDetail}
                    closeBlur={this.closeBlurSection.bind(this)}
                    objCareer={this.props.careers.infoObjCareer}
                />
            );
        }
    }

    render() {
        const {
            containerStyle,
            containerStyleMain,
            containerScrollViewMain
        } = styles;

        return (
            <View style={containerStyleMain}>
                <Header />
                <View style={containerScrollViewMain}>
                    {this.returnCarousel()}
                </View>
                <Menu indexSelected={this.props.indexSelected} />
                {this.returnTemplateCareer()}
            </View>
        );
    }

    _renderItem({ item, index }) {
        let { width } = Dimensions.get('window');
        const {
            snapCarouselItemTitle,
            snapCarouselItemTitleText,
        } = styles;

        return (
            <View>
                <TouchableOpacity onPress={this.clickCareer.bind(this, item.careers_id)}>
                    <Image
                        resizeMode='stretch'
                        style={{ width: width, height: 230 }}
                        source={{ uri: SERVER_DIR + item.careers_url_img }}
                    />
                    <View style={snapCarouselItemTitle}>
                        <Text style={snapCarouselItemTitleText}>{item.careers_title}</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    {this.returnIconSlide(index)}
                </View>
            </View>
        );
    }

    returnIconSlide(index) {
        if (index === 0) {
            return (
                <View style={{ alignItems: 'center', marginTop: 25 }}>
                    <Image
                        style={{ width: 38, height: 38 }}
                        source={require('../../assets/icons/move_slide.png')}
                    />
                    <Text style={{marginTop:5}}>Deslize hacia los lados</Text>
                </View>
            );
        }
    }

    returnCarousel() {
        if (this.props.careers.infoCareers) {
            let { width } = Dimensions.get('window');
            const { snapCarouselItemContainer } = styles;
            return (
                <View style={snapCarouselItemContainer}>
                <Text style={{color:"#4fc3f7"}}>Click en la imagen para ver información de la carrera.</Text>
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
            const { containerActivity } = styles;
            return (
                <View style={containerActivity}>
                    <ActivityIndicator
                        size="large"
                        color="#3dc4ff"
                    />
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
        marginBottom: 15,
        flex: 1
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
        marginRight: 10,
        alignItems:'center'
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
    }

}

const mapStateToProps = ({ careers }) => {
    return {
        careers: careers
    };
};

export default connect(mapStateToProps, { onLoadCareers, showCareerDetail, closeBlurSection })(Carrers);