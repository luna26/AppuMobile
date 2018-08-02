import { LOAD_NEWS, NEWS_LOADING, LOAD_MORE_NEWS, NO_MORE_NEWS } from '../actions/types';

const INITIAL_STATE = {
  loading_news: false,
  loading_more_news: false,
  news: [],
  skip: 0,
  take: 7,
  moreNews:true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_NEWS:
      return { ...state, loading_news: action.payload };
    case LOAD_MORE_NEWS:
      return { ...state, loading_more_news: action.payload };
    case NEWS_LOADING:
      return { ...state, loading_more_news: false, news: state.news.concat(action.payload), skip: state.take, take: state.take + 7 };
    case NO_MORE_NEWS:
      return { ...state, moreNews: false, loading_more_news: false };
    default:
      return state;
  }
};