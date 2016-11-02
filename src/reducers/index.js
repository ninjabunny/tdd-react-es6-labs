import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import pollData from './pollData';
import checkedValue from './checkedValue';

const rootReducer = combineReducers({pollData,checkedValue,router:routerReducer});

export default rootReducer;