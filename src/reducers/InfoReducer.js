import { ON_LOAD_INFO } from '../actions/types';

const INITIAL_STATE = {
    infoObj: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_LOAD_INFO:
            return { ...state, infoObj: action.payload };
            break;
        default:
            return state;
    }
};
