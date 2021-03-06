import { LOAD_NEWS, NEWS_LOADING, LOAD_MORE_NEWS, NO_MORE_NEWS } from './types';
import axios from 'axios';
import { SERVER_DIR } from '../Config';

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
        axios.post(SERVER_DIR+'/getNews', {skip:skip})
            .then(function (response) {
                if(response.data.length != 0){
                    setTimeout(function () {
                        dispatch({
                            type: NEWS_LOADING,
                            payload: response.data
                        });
                    },1500);
                }else{
                    dispatch({
                        type: NO_MORE_NEWS,
                        payload: response.data
                    });
                }
            }) 
            .catch(function (error) {
                console.log(error);
            });
    };
}