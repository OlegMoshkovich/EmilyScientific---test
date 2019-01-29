import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button'
import RadioButtonsGroup from '../Components/RadioButtonsGroup'
import {connect} from 'react-redux';
import axios from 'axios';

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


class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
    count:0,
    questions:[1,2],
    }
    this.createQuestions = this.createQuestions.bind(this);
  }

  // componentDidMount() {
  //   fetch("https://api.emilyscintific.com/advil")
  //   .then(res=>res.json())
  //   .then((res) =>{
  //       this.setState({
  //         collection:result.collection
  //       })
  //     }
  //   )
  // }

  createQuestions = () =>{
    let questions = [];
    let index = 0;
    for(let record of collection){
      questions.push(
        <div key = {index} className = "Question">
          <RadioButtonsGroup  key = {index}question = {record.question} answers = {record.answers} handleAnswer = {this.handleAnswer} />
        </div>)
        index++;
      }
      return questions
  }
  handleAnswer = (info) =>{
      console.log('info',info)
  }

  render() {
    return (
      <div className="App">
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

export default connect(mapStateToProps, mapDispatchToProps)(Form);
