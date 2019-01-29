import React, { Component } from 'react';
import '../App.css';
import RadioButtonsGroup from '../Components/RadioButtonsGroup'
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button'

let style = {
  button:{
    margin:'10px',
    fontSize:'10px',
    width:'150px'
  },
};

class SimpleRedux extends Component {

  constructor(props) {
    super(props);
    this.state = {
    count:0
    }
  }

  render() {
    return (

      <div className="SimpleRedux">
         <Button style={style.button} variant="contained" color="primary" onClick={this.props.onCounterIncrement}>Add</Button>
         <Button style={style.button} variant="contained" color="primary" onClick={this.props.onCounterDecrease}>Subtract</Button>
         <div>{this.props.cnt}</div>
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
    cnt:state.reducer.counter
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleRedux);
