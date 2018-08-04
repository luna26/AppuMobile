import {
    ON_LOAD_CAREERS_CALC,
    ON_LOAD_COURSES_CALC,
    ON_LOAD_CALC_COST,
    ON_CLEAR_ARRAY_COSTS,
    ALL_FIELD_ARE_REQUIRED
} from '../actions/types';

const INITIAL_STATE = {
    careersCalculator: [],
    courses: [],
    costs: null,
    fieldsRequired: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_LOAD_CAREERS_CALC:
            return { ...state, careersCalculator: action.payload };
        case ON_LOAD_COURSES_CALC:
            return { ...state, courses: action.payload, loader_cost: false };
        case ON_LOAD_CALC_COST:
            return { ...state, costs: action.payload };
        case ON_CLEAR_ARRAY_COSTS:
            return { ...state, costs: action.payload };
        case ALL_FIELD_ARE_REQUIRED:
            return { ...state, fieldsRequired: action.payload };
        default:
            return state;
    }
};