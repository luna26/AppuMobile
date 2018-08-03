import {
    ON_LOAD_CAREERS_CALC,
    ON_LOAD_COURSES_CALC,
    ON_LOAD_CALC_COST
} from '../actions/types';

const INITIAL_STATE = {
    careersCalculator: [],
    courses: [],
    costs:null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_LOAD_CAREERS_CALC:
            return { ...state, careersCalculator: action.payload };
        case ON_LOAD_COURSES_CALC:
            return { ...state, courses: action.payload, loader_cost:false };
        case ON_LOAD_CALC_COST:
            return { ...state, costs:action.payload };
        default:
            return state;
    }
};