import { ON_LOAD_CAREERS, ON_LOAD_CAREER_DETAIL, ON_RECEIVED_INFO_CAREER } from '../actions/types';

const INITIAL_STATE = {
  infoCareers: null,
  careerDetail: null,
  infoObjCareer:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_LOAD_CAREERS:
      return { ...state, infoCareers: action.payload };
    case ON_LOAD_CAREER_DETAIL:
      return { ...state, careerDetail: action.payload };
    case ON_RECEIVED_INFO_CAREER:
      return { ...state, infoObjCareer: action.payload };
    default:
      return state;
  }
};
