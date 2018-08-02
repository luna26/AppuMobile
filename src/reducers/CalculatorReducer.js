import { ON_LOAD_CAREERS_CALC, ON_LOAD_COURSES_CALC } from '../actions/types';

const INITIAL_STATE = {
    careersCalculator: [],
    courses: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_LOAD_CAREERS_CALC:
            return { ...state, careersCalculator: action.payload };
        case ON_LOAD_COURSES_CALC:
            return { ...state, courses: action.payload };
        default:
            return state;
    }
};