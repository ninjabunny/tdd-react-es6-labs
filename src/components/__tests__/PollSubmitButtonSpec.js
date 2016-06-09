jest.dontMock('../PollSubmitButton');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import PollSubmitButton from '../PollSubmitButton.js';

describe('Poll Submit Button', function() {

    it('renders without a problem', function () {

        var pollsubmitbutton = TestUtils
            .renderIntoDocument(<div><PollSubmitButton /></div>);

        var buttonText = ReactDOM
            .findDOMNode(pollsubmitbutton).textContent;

        expect(buttonText).toEqual('Go!');
    });

});
