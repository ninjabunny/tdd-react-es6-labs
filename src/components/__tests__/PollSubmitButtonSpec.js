/* eslint-disable */

jest.dontMock('../PollSubmitButton');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';


describe('Poll Submit Button', function() {

    const PollSubmitButton = require('../PollSubmitButton').default;

    it('renders without a problem', function () {

        var pollsubmitbutton = TestUtils
            .renderIntoDocument(<PollSubmitButton />);

        var buttonText = ReactDOM.findDOMNode(pollsubmitbutton).textContent;

        expect(buttonText).toEqual('Go!');
    });

    /*it('calls handler function on click', function () {

        var PollSubmitButton = require('../PollSubmitButton').default;

        var handleClick = jest.genMockFunction();

        var pollsubmitbutton = TestUtils
            .renderIntoDocument(<PollSubmitButton question={0} handleClick={handleClick}/>);

        var buttonInstance = ReactDOM.findDOMNode(pollsubmitbutton);

        TestUtils.Simulate.click(buttonInstance);

        expect(handleClick).toBeCalled();

        var numberOfCallsMadeIntoMockFunction = handleClick.mock.calls.length;

        expect(numberOfCallsMadeIntoMockFunction).toBe(1);
    });*/

});
