import React, { Component } from 'react';
import './App.css';
// import Button from '@material-ui/core/Button'
import RadioButtonsGroup from './Components/RadioButtonsGroup'
import {connect} from 'react-redux';

const collection = [
  {
    question:'how are you?',
    answers:{
      0:'ok',
      1:'great',
      2:'good',
      3:'bad'
    }
  },
{
  question:'how was your day?',
  answers:{
    0:'it was ok',
    1:'it was great',
    2:'it was good',
    3:'it was bad'
  }
},
{
  question:'how do your year?',
  answers:{
    0:'i agree',
    1:'i disagree',
    2:'yes',
    3:'no'
  }
},
]

// let style = {
//   button:{
//     margin:'10px',
//     fontSize:'10px',
//     width:'150px'
//   },
// };

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    count:0
    }
    this.createQuestions = this.createQuestions.bind(this);
  }

  createQuestions = () =>{
    let questions = [];
    let index = 0;

    for(let record of collection){
      questions.push(
        <div key = {index} className = "Question">
          <RadioButtonsGroup  key = {index}question = {record.question} answers = {record.answers}  />
        </div>)
        index++;
      }
      return questions

  }

  render() {

    return (
      <div className="App">
      <div className="title-box">
        <div className ="project_title">Form Test</div>
       </div>

      {/*
         <Button style={style.button} variant="contained" color="primary" onClick={this.props.onCounterIncrement}>Add</Button>
         <Button style={style.button} variant="contained" color="primary" onClick={this.props.onCounterDecrease}>Subtract</Button>

         <div>{this.props.cnt}</div>
               */}
      {this.createQuestions()}

      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onCounterIncrement: () => { dispatch({type:'INCREMENT'})},
    onCounterDecrease: () => { dispatch({type:'DECREASE'})}
    }
  }



const mapStateToProps = state => {
  return {
    cnt:state.counter
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
