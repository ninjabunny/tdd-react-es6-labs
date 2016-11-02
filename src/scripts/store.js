import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import $ from 'jQuery';

//import root reducer
import rootReducer from './reducers/index';

var myRequest = new Request('http://localhost:8000/data/data.json');

var pollData = fetch(myRequest).then (function(response){
    return response.json();
});

//create an object for the default data

const defaultState = {
    pollData,
    checkedValue: []
};

