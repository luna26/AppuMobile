import { Actions } from 'react-native-router-flux';

export const goHome = (text) => {
    return dispatch => {
        setTimeout(function(){
            Actions.home();
        }, 3000);
    };
}