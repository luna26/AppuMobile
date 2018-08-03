import React, { Component } from 'react';
import { View } from 'react-native';
import MenuItem from './menuItem';
import { connect } from 'react-redux';
import { onChangeOption } from '../../actions';
import { Actions } from 'react-native-router-flux';

class Menu extends Component {

    onChangeOption(index) {
        switch (index) {
            case 1:
                Actions.home({ indexSelected: 1 });
                break;
            case 2:
                Actions.carrers({ indexSelected: 2 });
                break;
            case 3:
                Actions.carrers({ indexSelected: 3 });
                break;
            case 4:
                Actions.carrers({ indexSelected: 4 });
                break;
            case 5:
                Actions.info({ indexSelected: 5 });
                break;
            case 6:
                Actions.calc({ indexSelected: 6 });
                break;
        }
    }
    render() {
        const { menu } = this.props;
        const { containerMenu } = styles;
        return (
            <View style={containerMenu}>
                <MenuItem
                    label={''}
                    iconSelected={'home'}
                    index={1}
                    onPress={this.onChangeOption.bind(this)}
                    indexSelected={this.props.indexSelected}
                />
                <MenuItem
                    label={''}
                    iconSelected={'carrers'}
                    index={2}
                    onPress={this.onChangeOption.bind(this)}
                    indexSelected={this.props.indexSelected}
                />
                <MenuItem
                    label={''}
                    iconSelected={'calc'}
                    index={6}
                    onPress={this.onChangeOption.bind(this)}
                    indexSelected={this.props.indexSelected}
                />
                <MenuItem
                    label={''}
                    iconSelected={'info'}
                    index={5}
                    onPress={this.onChangeOption.bind(this)}
                    indexSelected={this.props.indexSelected}
                />
            </View>
        );
    }
}

const styles = {
    containerMenu: {
        borderTopColor: '#179bd7',
        borderTopWidth: 6,
        flexDirection: 'row',
        height: 65,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 7
    }
}

export default Menu;