import React from 'react';
import PollHeader from '../components/PollHeader';
import PollQuestion from '../components/PollQuestion';
import RadioButtonGroup from '../components/RadioButtonGroup';
import PollSubmitButton from '../components/PollSubmitButton.js';
import $ from 'jQuery';
import * as actions from '../actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


var header = '';
var questions = [];
var choices = [];
var correctAnswer = [];
var numberOfQuestions;




class PollContainer extends React.Component {


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




    render(){
        var rowStyle = {
            backgroundColor: '#dadada',
            border: '1px solid black',
            borderRadius: '6px',
            padding: '10px'
        };

        


        var questionsOutput = questions.map(function(question,questionNumber){
            return (
                <div key={`question-number-${questionNumber}`}>
                    <PollQuestion text={question.question} />
                    <RadioButtonGroup
                        name={questionNumber}
                        checkedValue={this.props.selections[questionNumber]}
                        choices={question.choices}
                        onChange = {this.props.actions.selectAnswer}

                       />
                </div>
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



function mapStateToProps(state){
    return {
        selections:state.selections
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions,dispatch)
        }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps)(PollContainer);