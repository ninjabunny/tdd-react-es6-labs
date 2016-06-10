import React from 'react';
import PollHeader from '../components/PollHeader';
import PollQuestion from '../components/PollQuestion';
import RadioButtonGroup from '../components/RadioButtonGroup';
import PollSubmitButton from '../components/PollSubmitButton.js';
import $ from 'jQuery';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import selector from '../reducers';

var header = "";
var questions = [];
var choices = [];
var correctAnswer = [];
var numberOfQuestions;

//store
const store = createStore(selector);

//action type
const SELECT = 'SELECT';

//action creator
function checkTheBox(name,value){
    return {
        type: SELECT,
        name,
        value
    }
}

class PollContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            checkedValue: []
         };
        this.setCheckedValue = this.setCheckedValue.bind(this);

    }


    setCheckedValue(name,value){
        var newChecked = this.state.checkedValue.slice(0,this.state.numberOfQuestions);
        newChecked[name] = value;

        this.setState({
            checkedValue: newChecked
        });
    }

    checkAnswer(name,value){
        if (value===correctAnswer[name]){
            console.log('correct');
        }
    }




    componentWillMount() {
        console.log('componentWillMount()');
    }

    componentDidMount(){
        console.log('componentDidMount');
        this.serverRequest = $.get('http://localhost:8000/data/data.json', function (result) {
            header = result.poll.header;
            questions = result.poll.questions;
            choices = result.poll.questions[0].choices;
            correctAnswer = result.poll.questions[0].correctAnswer;
            numberOfQuestions= result.poll.questions.length;
            }.bind(this));
    }


    componentWillReceiveProps() {
        console.log('componentWillReceiveProps()');
    }
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate()');
        return true;
    }
    componentWillUpdate() {
        console.log('componentWillUpdate()');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate');
        this.checkAnswer(this.state.checkedValue);
    }
    componentWillUnmount() {
        console.log('componentWillUnmount()');
    }

    render(){
        var rowStyle = {
            backgroundColor: '#dadada',
            border: '1px solid black',
            borderRadius: '6px',
            padding: '10px'
        };

        
        store.subscribe(() => {
            this.setState({checkedValue: store.getState()});
        });
        
        var questionsArray = questions;
        var questionsOutput = questionsArray.map(function(question,questionNumber){
            return (
                <Provider store={store}>
                <div key={`question-number-${questionNumber}`}>
                    <PollQuestion text={question.question} />
                    <RadioButtonGroup
                        name={questionNumber}
                        checkedValue={this.state.checkedValue[questionNumber]}
                        choices={question.choices}
                        onChange = {store.dispatch(checkTheBox(questionNumber,this.state.checkedValue[questionNumber]))} />
                </div>
                </Provider>
            );

        }.bind(this));

        return (
            <div className="container">
                <div className="jumbotron">
                    <PollHeader text={header} />
                </div>
                <div className="row" style={rowStyle}>
                    <div className="col-sm-4 col-sm-offset-4">
                        <form>
                            {questionsOutput}
                            <PollSubmitButton />
                        </form>
                    </div>
                </div>

            </div>
        );
    }

}


export default PollContainer;