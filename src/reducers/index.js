import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import MenuReducer from './MenuReducer';
import CareersReducer from './CareersReducer';

export default combineReducers({
  home: HomeReducer,
  menu: MenuReducer,
  careers: CareersReducer
});
