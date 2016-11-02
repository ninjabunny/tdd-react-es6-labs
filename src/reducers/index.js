import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import questions from './questions';
import checkedValue from './checkedValue';

const rootReducer = combineReducers({questions,checkedValue,routing:routerReducer});

export default rootReducer;