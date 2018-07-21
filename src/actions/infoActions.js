import { ON_LOAD_INFO } from './types';
import axios from 'axios';


export const getInfo = () => {
    return dispatch => {
        axios.post('http://34.219.69.51/getInfo')
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