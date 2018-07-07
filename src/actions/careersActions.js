import { ON_LOAD_CAREERS } from './types';
import axios from 'axios';


export const onLoadCareers = () => {
    return dispatch => {
        axios.post('http://34.219.69.51/getCareers')
            .then(function (response) {
                console.log(response);
                setTimeout(function () {
                    dispatch({
                        type: ON_LOAD_CAREERS,
                        payload: response.data
                    });
                },1500);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}