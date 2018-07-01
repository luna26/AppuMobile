import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import MenuReducer from './MenuReducer';

export default combineReducers({
  home: HomeReducer,
  menu: MenuReducer
});
