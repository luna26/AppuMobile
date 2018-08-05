import { Actions, ActionConst } from 'react-native-router-flux';

export const goHome = (text) => {
    return dispatch => {
        setTimeout(function(){
            Actions.pop();
            Actions.home();
        }.bind(this), 3000);
    };
}