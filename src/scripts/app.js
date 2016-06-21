import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import selector from '../reducers';

function configureStore(initialState) {
    const store = createStore(selector, initialState,
        window.devToolsExtension && window.devToolsExtension()
    );
    return store;
}

let store = configureStore();

import App from '../containers/App';
import PollContainer from '../containers/PollContainer';
import AboutUs from '../components/AboutUs';


ReactDOM.render((
    <Provider store = {store}>
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="poll" component={PollContainer} />
            <Route path="about" component={AboutUs} />
        </Route>
    </Router>
    </Provider>),
    document.getElementById('app')
);