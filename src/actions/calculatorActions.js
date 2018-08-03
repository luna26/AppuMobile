import {
    ON_LOAD_CAREERS_CALC,
    ON_LOAD_COURSES_CALC,
    ON_LOAD_CALC_COST
} from './types';
import axios from 'axios';

export const onLoadCareersCalc = () => {
    return dispatch => {
        axios.post('http://34.219.69.51/getCareers')
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
        axios.post('http://34.219.69.51/getCoursesCarrer', { id: id })
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
        axios.post('http://34.219.69.51/calcCost', data)
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
