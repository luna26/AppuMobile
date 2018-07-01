import React, { Component } from 'react';
import { View } from 'react-native';
import MenuItem from './menuItem';
import { connect } from 'react-redux';
import { onChangeOption } from '../../actions';
import { Actions } from 'react-native-router-flux';

class Menu extends Component {
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         refsFromNews:null,
    //         update:true
    //     }
    // }

    onChangeOption(index) {
        switch (index) {
            case 1:
            if(index != this.props.indexSelected){
                Actions.home({ indexSelected: 1 });
            } else {
                this.props.onTop();
            }
                break;
            case 2:
                //Actions.carrers({ indexSelected: 2 });
                break;
            case 3:
                Actions.carrers({ indexSelected: 3 });
                break;
            case 4:
                Actions.carrers({ indexSelected: 4 });
                break;
            case 5:
                Actions.carrers({ indexSelected: 5 });
                break;
        }
    }
    render() {
        const { menu } = this.props;
        const { containerMenu } = styles;
        return (
            <View style={containerMenu}>
                <MenuItem
                    label={'Inicio'}
                    iconSelected={'home'}
                    index={1}
                    onPress={this.onChangeOption.bind(this)}
                    indexSelected={this.props.indexSelected}
                />
                <MenuItem
                    label={'Carreras'}
                    iconSelected={'carrers'}
                    index={2}
                    onPress={this.onChangeOption.bind(this)}
                    indexSelected={this.props.indexSelected}
                />
                <MenuItem
                    label={'Eventos'}
                    iconSelected={'events'}
                    index={3}
                    onPress={this.onChangeOption.bind(this)}
                    indexSelected={this.props.indexSelected}
                />
                {/* <MenuItem
                    label={'Contactos'}
                    iconSelected={'contact'}
                    index={4}
                    onPress={this.onChangeOption.bind(this)}
                    indexSelected={this.props.indexSelected}
                /> */}
                <MenuItem
                    label={'Info'}
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
        height: 75,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 7
    }
}

export default Menu;