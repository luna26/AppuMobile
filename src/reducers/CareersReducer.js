import { ON_LOAD_CAREERS } from '../actions/types';

const INITIAL_STATE = {
  infoCareers:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_LOAD_CAREERS:
      return { ...state, infoCareers: action.payload };
    default:
      return state;
  }
};
