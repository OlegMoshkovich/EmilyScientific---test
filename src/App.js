import React, { Component } from 'react';

import './App.css';
import Button from '@material-ui/core/Button'


import {connect} from 'react-redux';

let style = {
  button:{
    margin:'10px',
    fontSize:'10px',
    width:'150px'
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    count:0
    }

  }

  buttonHandler= () =>{
    this.setState({
      count:this.state.count+1
    })
  }

  render() {
    return (
      <div className="App">
         <Button style={style.button} variant="contained" color="primary" onClick={this.onCounterIncrement}>Count</Button>
         <div>{this.props.cnt}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispath =>{
  return {
    onCounterIncrement: () => dispath({type:'INCREMENT'})
  }
}

const mapStateToProps = state => {
  return {
    cnt:state.counter
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
