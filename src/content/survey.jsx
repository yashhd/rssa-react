import React, { Component } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
/*import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';*/

class SurveyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toInstructions: false,
      questions: [],
      disabled: true,
      currentStep: 1
    };
    const user = this.props.user;
    /* user.acceptTerms = true;*/
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const questions = this.state.questions;
    let newQ = { "question": evt.target.id, "answer": evt.target.value };

    if (evt.target.id !== "formGridAge" && evt.target.id !== "formGridGender") {
      const fields = evt.target.id.split('-');
      newQ = { "question": fields[0], "answer": fields[1] };
    }

    // check existing question/answer list
    // if match found, filter out the match before pushing updated version
    const matchIdx = questions.findIndex(q => (q.question === newQ.question));
    if (matchIdx >= 0) {
      questions[matchIdx].answer = newQ.answer;
    } else {
      questions.push(newQ);
    }
    const currentStep = this.state.currentStep;
    const disabled = !((currentStep === 1 && questions.length === 6) || (currentStep === 2 && questions.length === 6) || (currentStep === 3 && questions.length === 7) || (currentStep === 4 && questions.length === 5) || (currentStep === 5 && questions.length === 7) || (currentStep === 6 && questions.length === 6));
    this.setState({ questions: questions, disabled: disabled });
  }


  /*
  functions to handle next and previous buttons 
  */

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 6 : currentStep + 1;
    this.setState({ currentStep: currentStep, disabled: true });
  }

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({ currentStep: currentStep, disabled: true });
  }

  previousButton() {
    const currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button" onClick={this._prev}>
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    const currentStep = this.state.currentStep;
    if (currentStep < 6) {
      return (
        <button disabled={this.state.disabled}
          className="btn btn-primary float-right"
          type="button" onClick={this._next}>
          Next
        </button>
      );
    }
    return null;
  }

  submitButton() {
    const currentStep = this.state.currentStep;
    if (currentStep === 6) {
      return (
        <button disabled={this.state.disabled}
          className="btn btn-primary float-right"
          size="lg" type="submit">
          Submit
        </button>
      );
    }
    return null;
  }

  handleSubmit(evt) {
    //evt.preventDefault();
    //evt.stopPropagation();
    /* user.postSurveyResponses = this.state.questions;
    user.timePostStimulusEnd = Date.now();
    user.timeSessionEnd = Date.now();
    user.completed = true;
    this.props.updateUser(user);
    this.setState({
      toFinish: true,
      user: user
    });*/
  };

  render() {

    {/* ###################################################
      Taking this out for now, reinstate once data is connected
    
    const user = this.props.user;
    if (this.state.toFinish === true) {
      return <Redirect to='/exit' />
    }
    }
    */}


    return (
      <React.Fragment>
        <div>
          <ProgressBar
            percent={90}
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)">

            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ marginLeft: 40, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                  width="30"
                  src="/one.png"
                />
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                  width="30"
                  src="/two.png"
                />
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ paddingright: 90, filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                  width="30"
                  src="/three.png"
                />
              )}
            </Step>

            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 100}%)` }}
                  width="30"
                  src="/four.png"
                />
              )}
            </Step>

            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ marginRight: 40, filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                  width="30"
                  src="/five.png"
                />
              )}
            </Step>

          </ProgressBar>

          <div className="survey-page">
            <h2>Post-task survey</h2>

            <form id="postSurvey" onSubmit={(evt) => this.handleSubmit(evt)} >

            <StepThrough
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                stepFlag={1}
                questions_={[
                  { 'qId': 'q1', 'text': 'All the recommended movies in the final list were similar to each other.' },
                  { 'qId': 'q2', 'text': 'None of the movies in the recommended list were alike' },
                  { 'qId': 'q3', 'text': 'Most movies were from the same genre' },
                  { 'qId': 'q4', 'text': 'The recommended list of movies suits a broad set of tastes' },
                  { 'qId': 'q5', 'text': 'The recommended movies were from many different genres' },
                  { 'qId': 'q6', 'text': 'The recommendations contained a lot of variety' }
                ]}
              />
              <StepThrough
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                stepFlag={2}
                questions_={[
                  { 'qId': 'q1', 'text': 'I liked the movies recommended by the movie recommender' },
                  { 'qId': 'q2', 'text': 'I found the recommended movies appealing' },
                  { 'qId': 'q3', 'text': 'The recommended movies fit my preference' },
                  { 'qId': 'q4', 'text': 'The recommended movies were relevant' },
                  { 'qId': 'q5', 'text': 'The system recommended too many bad movies.' },
                  { 'qId': 'q6', 'text': 'I did not like any of the recommended movies.' }
                ]}
              />
              <StepThrough
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                stepFlag={3}
                questions_={[
                  { 'qId': 'q1', 'text': 'I like the movie I’ve chosen from the final recommendation list.' },
                  { 'qId': 'q2', 'text': 'The chosen movie fits my preference.' },
                  { 'qId': 'q3', 'text': 'I would recommend my chosen movie to others/friends.' },
                  { 'qId': 'q4', 'text': 'I was excited about my chosen movie' },
                  { 'qId': 'q5', 'text': 'I think I chose the best movie from the options' },
                  { 'qId': 'q6', 'text': 'I know several items that are better than the one I selected' },
                  { 'qId': 'q7', 'text': 'I would rather watch a different movie from the one I selected' }
                ]}
              />
              <StepThrough
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                stepFlag={4}
                questions_={[
                  { 'qId': 'q1', 'text': 'I feel like I was recommended the same movies as everyone else.' },
                  { 'qId': 'q2', 'text': 'The movies that were recommended are very popular movies.' },
                  { 'qId': 'q3', 'text': 'I selected the movies that I think are the most popular overall.' },
                  { 'qId': 'q4', 'text': 'I selected movies that are rather different from what I imagine others would choose.' },
                  { 'qId': 'q5', 'text': 'Probably nobody selected the exact same set of movies as me.' }
                ]}
              />
              <StepThrough
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                stepFlag={5}
                questions_={[
                  { 'qId': 'q1', 'text': 'The movie recommender catered to all of my potential interests' },
                  { 'qId': 'q2', 'text': 'The movies that were recommended did not reflect my diverse taste in movies.' },
                  { 'qId': 'q3', 'text': 'The movie recommender seemed to target only a small subset of my interests.' },
                  { 'qId': 'q4', 'text': 'The movie recommender treated me as a one-dimensional person.' },
                  { 'qId': 'q5', 'text': 'The lists of recommendations matched a diversity of my preferences.' },
                  { 'qId': 'q6', 'text': 'The recommended movies were a perfect fit for me on many different levels.' },
                  { 'qId': 'q7', 'text': 'The movie recommender seemed to stereotype me in a particular category of viewers.' }
                ]}
              />
              <StepThrough
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                stepFlag={6}
                questions_={[
                  { 'qId': 'q1', 'text': 'I like using the system.' },
                  { 'qId': 'q2', 'text': 'Using the system is a pleasant experience.' },
                  { 'qId': 'q3', 'text': 'I would recommend the system to others.' },
                  { 'qId': 'q4', 'text': 'I can find better movies using the system.' },
                  { 'qId': 'q5', 'text': 'I would quickly abandon using the system.' },
                  { 'qId': 'q6', 'text': 'I would use the system more often if possible.' }
                ]}
              />
              {/* {this.previousButton()} */}
              {this.nextButton()}
              {this.submitButton()}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function StepThrough(props) {
  if (props.currentStep !== props.stepFlag) {
    return null
  }
  return (
    <React.Fragment>
      <div className="card bg-light mb-3">
        <div className="card-body">
          <p>Please rate your agreement with the statements about your experience with your <strong> LAST </strong> movie option:</p>
          {props.questions_.map((likert, i) => (
            <div className="form-group" controlid={"Diversity_" + i} key={"Diversity_" + i} onChange={(evt) => props.handleChange(evt)}>
              <div className="form-row">  
                <label as="legend" className="font-weight-bold">{likert.text}</label>
 
                <div className="col">

                <div className="custom-control custom-radio custom-control-inline">
                  <input className="radio-margin" type="radio" name={"Diversity_" + likert.qId} id={"Diversity_" + likert.qId + "-1"} />
                  <label htmlFor={"lastMovie" + i}>Strongly disagree</label>
                </div>

                <div className="custom-control custom-radio custom-control-inline">
                  <input className="radio-margin" type="radio" name={"Diversity_" + likert.qId} id={"Diversity_" + likert.qId + "-2"} />
                  <label htmlFor={"lastMovie" + i}>Disagree</label>
                </div>

                <div className="custom-control custom-radio custom-control-inline">
                  <input className="radio-margin" type="radio" name={"Diversity_" + likert.qId} id={"Diversity_" + likert.qId + "-3"} />
                  <label htmlFor={"lastMovie" + i}>Neither agree nor disagree</label>
                </div>

                <div className="custom-control custom-radio custom-control-inline">
                  <input className="radio-margin" type="radio" name={"Diversity_" + likert.qId} id={"Diversity_" + likert.qId + "-4"} />
                  <label htmlFor={"lastMovie" + i}>Agree</label>
                </div>

                <div className="custom-control custom-radio custom-control-inline">
                  <input className="radio-margin" type="radio" name={"Diversity_" + likert.qId} id={"Diversity_" + likert.qId + "-5"} />
                  <label htmlFor={"lastMovie" + i}>Strongly agree</label>
                </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </React.Fragment>
  );
}

export default SurveyPage;
