import { LOAD_NEWS, NEWS_LOADING } from '../actions/types';

const INITIAL_STATE = {
  loading_news: false,
  news: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_NEWS:
      return { ...state, loading_news: action.payload };
    case NEWS_LOADING:
      return { ...state, news: action.payload };
    default:
      return state;
  }
};
