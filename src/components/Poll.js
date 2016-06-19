import React from 'react';
import PollQuestion from './PollQuestion';
import RadioButtonGroup from './RadioButtonGroup';
import {connect} from 'react-redux';


class Poll extends React.Component {

    render(){

        var questionsArray = this.props.questions;
        var questionsOutput = questionsArray.map(function(question,questionNumber){
            return (

                <div key={`question-number-${questionNumber}`}>
                    <PollQuestion text={question.question} />
                    <RadioButtonGroup
                        name={questionNumber}
                        checkedValue={this.props.checkedValue.questionNumber}
                        choices={question.choices}
                        onChange = {this.props.onChange}
                        />
                </div>

            );

        }.bind(this));
        
        return (
            <div>
                {questionsOutput}
            </div>
        );
    };
}

function mapStateToProps(state){
    return {checkedValue:state.checkedValue}
}

export default connect(mapStateToProps)(Poll);