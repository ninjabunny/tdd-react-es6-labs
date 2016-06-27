import {combineReducers} from 'redux';
import selections from './selectionReducer';



const rootReducer = combineReducers({
    selections
});

export default rootReducer;