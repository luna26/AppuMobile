import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Linking  } from 'react-native';
import { connect } from 'react-redux';
import { getSpecificCareer } from '../../actions';

class BlurSectionCarrer extends Component {
    componentWillMount() {
        this.props.getSpecificCareer(this.props.idCareer);
    }

    render() {
        console.log(this.props.objCareer, 'FUNCIONA');
        const { blurContainer, blurSubContainer } = styles;
        return (
            <View style={blurContainer}>
                <View style={blurSubContainer}>
                    {this.renderInfoCareer()}
                </View>
            </View>
        );
    }

    onClickPlan(planUrl){
        let plaUrlServer = 'http://34.219.69.51/' + planUrl;
        Linking.canOpenURL(plaUrlServer).then(supported => {
            if (supported) {
              Linking.openURL(plaUrlServer);
            } else {
              console.log("Don't know how to open URI: " + plaUrlServer);
            }
          });
    }

    renderInfoCareer() {
        if (this.props.objCareer) {
            console.log(this.props.objCareer[0], 'this.props.objCareer[0]');
            const { styleTextButton, styleTitleText, buttoStyle, mainContainer, infoContainer, containerTitle, containerDesc, styleDescText, containerButton } = styles;
            return (
                <View style={mainContainer}>
                    <View style={infoContainer}>
                        <View style={containerTitle}>
                            <Text style={styleTitleText}>{this.props.objCareer[0].careers_title}</Text>
                        </View>
                        <ScrollView style={containerDesc}>
                            <Text style={styleDescText}>{this.props.objCareer[0].careers_desc}</Text>
                        </ScrollView>
                    </View>
                    <View style={containerButton}>
                        <TouchableOpacity onPress={this.onClickPlan.bind(this, this.props.objCareer[0].careers_url_path)} style={buttoStyle}>
                            <Text style={styleTextButton}>Plan de estudio</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={containerButton}>
                        <TouchableOpacity style={buttoStyle} onPress={this.props.closeBlur}>
                            <Text style={styleTextButton}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            const {onLoadContainer} = styles;
            return (
                <View style={onLoadContainer}>
                     <ActivityIndicator size="large" color="rgba(61, 196, 255, 0.9)" />
                </View>
            );
        }
    }
}

const styles = {
    blurContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(61, 196, 255, 0.9)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    },
    blurSubContainer: {
        backgroundColor: 'white',
        flex: 0.90,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 30
    },
    styleTitleText: {
        fontSize: 22
    },
    styleDescText:{

    },
    mainContainer: {
        flex:1
    },
    infoContainer: {
        marginTop:15,
        paddingLeft:15,
        flex:85
    },
    containerDesc:{
        marginTop:20,
    },
    containerButton:{
        flex:15,
        justifyContent:'center',
        borderTopColor: '#179bd7',
        borderTopWidth: 1,
    },
    containerTitle:{
    
    },
    buttoStyle:{
        height:50,
        justifyContent:'center',
        borderRadius:15,
        backgroundColor:'#179bd7',
        marginLeft:15,
        marginRight:15
    },
    styleTextButton:{
        textAlign:'center',
        color:'white'
    },
    onLoadContainer:{
        justifyContent:'center',
        flex:1
    }
}

const mapStateToProps = ({ careers }) => {
    return {
        careers: careers
    };
};

export default connect(mapStateToProps, { getSpecificCareer })(BlurSectionCarrer);