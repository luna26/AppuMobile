import { ON_LOAD_CAREERS, ON_LOAD_CAREER_DETAIL, ON_RECEIVED_INFO_CAREER } from './types';
import axios from 'axios';
import { SERVER_DIR } from '../Config';

export const onLoadCareers = () => {
    return dispatch => {
        axios.post(SERVER_DIR+'/getCareers')
            .then(function (response) {
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
export const showCareerDetail = (id) => {
    return dispatch =>{
        dispatch({
            type: ON_LOAD_CAREER_DETAIL,
            payload: id
        });
    }
}

export const getSpecificCareer = (id) =>{
    return dispatch => {
        axios.post(SERVER_DIR+'/getCareer', { id: id })
            .then(function (response) {
                setTimeout(function () {
                    dispatch({
                        type: ON_RECEIVED_INFO_CAREER,
                        payload: response.data
                    });
                },1500);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

export const closeBlurSection = () =>{
    return dispatch =>{
        dispatch({
            type: ON_LOAD_CAREER_DETAIL,
            payload: null
        });
        dispatch({
            type: ON_RECEIVED_INFO_CAREER,
            payload: null
        });
    }
}
