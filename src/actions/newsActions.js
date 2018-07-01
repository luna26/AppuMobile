import { LOAD_NEWS, NEWS_LOADING } from './types';
import axios from 'axios';

export const loadNewsRequest = () => {
    return dispatch => {
        dispatch({
            type: LOAD_NEWS,
            payload: true
        });
        axios.post('http://34.219.69.51/getNews')
            .then(function (response) {
                console.log(response);
                setTimeout(function () {
                    dispatch({
                        type: NEWS_LOADING,
                        payload: response.data
                    });
                },1500);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}