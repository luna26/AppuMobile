import {
    ON_LOAD_CAREERS_CALC,
    ON_LOAD_COURSES_CALC,
    ON_LOAD_CALC_COST,
    ON_CLEAR_ARRAY_COSTS,
    ALL_FIELD_ARE_REQUIRED
} from './types';
import axios from 'axios';
import { SERVER_DIR } from '../Config';

export const onLoadCareersCalc = () => {
    return dispatch => {
        axios.post(SERVER_DIR+'/getCareers')
            .then(function (response) {
                dispatch({
                    type: ON_LOAD_CAREERS_CALC,
                    payload: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

export const getCoursesCarrer = (id) => {
    return dispatch => {
        axios.post(SERVER_DIR+'/getCoursesCarrer', { id: id })
            .then(function (response) {
                console.log(response.data);
                dispatch({
                    type: ON_LOAD_COURSES_CALC,
                    payload: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

export const requestCalc = (name, email, tel, courses) => {
    return dispatch => {
        data = {
            name: name,
            email: email,
            tel: tel,
            courses: courses
        }
        axios.post(SERVER_DIR+'/calcCost', data)
            .then(function (response) {
                console.log(response, 'response');
                dispatch({
                    type: ON_LOAD_CALC_COST,
                    payload: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const clearArrayCosts = () =>{
    return dispatch => {
        dispatch({
            type: ON_CLEAR_ARRAY_COSTS,
            payload: null
        });
    }
}

export const allFiledAreRequired = (validation) =>{
    return dispatch => {
        dispatch({
            type: ALL_FIELD_ARE_REQUIRED,
            payload: validation
        });
    }
}
