import React from 'react';

import { render } from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from '../containers/App';
import PollContainer from '../containers/PollContainer';
import AboutUs from '../components/AboutUs';

import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
    <Router history = {browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PollContainer} />
            <Route path="/about" component={AboutUs} />
        </Route>
    </Router>
);


render(router, document.getElementById('app'));