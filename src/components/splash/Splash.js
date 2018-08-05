import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Image,
    ActivityIndicator
} from 'react-native';
import { goHome } from '../../actions/';

class Splash extends Component {
    render() {
        const { logoStyle, splashContainer } = styles;
        return (
            <View style={splashContainer}>
                <View>
                    <Image
                        style={logoStyle}
                        source={require('../../assets/images/Logo-ucem.png')}
                    />
                </View>
            </View>
        );
    };
    componentDidMount() {
        this.props.goHome();
    }
}

const styles = {
    splashContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default connect(null, { goHome })(Splash);