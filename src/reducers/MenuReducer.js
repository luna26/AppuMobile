import { ON_CHANGE_OPTION } from '../actions/types';

const INITIAL_STATE = {
  indexSelected:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_CHANGE_OPTION:
      return { ...state, indexSelected: action.payload };
      break;
    default:
      return state;
  }
};
