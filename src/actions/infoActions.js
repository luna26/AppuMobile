import { ON_LOAD_INFO } from './types';
import axios from 'axios';
import { SERVER_DIR } from '../Config';

export const getInfo = () => {
    return dispatch => {
        axios.post(SERVER_DIR+'/getInfo')
            .then(function (response) {
                console.log(response);
                setTimeout(function () {
                    dispatch({
                        type: ON_LOAD_INFO,
                        payload: response.data
                    });
                },1500);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}