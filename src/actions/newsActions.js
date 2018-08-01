import { LOAD_NEWS, NEWS_LOADING, LOAD_MORE_NEWS } from './types';
import axios from 'axios';

export const loadNewsRequest = (skip) => {
    return dispatch => {
        dispatch({
            type: LOAD_NEWS,
            payload: true
        });
        if(skip != 0){
            dispatch({
                type: LOAD_MORE_NEWS,
                payload: true
            });
        }
        axios.post('http://34.219.69.51/getNews', {skip:skip})
            .then(function (response) {
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