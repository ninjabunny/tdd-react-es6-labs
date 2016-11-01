import React from 'react';

import { render } from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers';

const initialState = {
    selections: []
};

function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        window.devToolsExtension && window.devToolsExtension()
    );
    return store;
}

let store = configureStore();


import App from '../containers/App';
import PollContainer from '../containers/PollContainer';
import AboutUs from '../components/AboutUs';

const router = (
    <Router history = {browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PollContainer} />
            <Route path="/about" component={AboutUs} />
        </Route>
    </Router>
);


render(router, document.getElementById('app'));
