import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
import EnhancedTable from './Components/SortableTable'
import CheckboxList from './Components/CheckBoxList'
import Popover from '@material-ui/core/Popover'
import './App.css';
import Button from '@material-ui/core/Button'
import {Collapse} from 'react-collapse'
import { Chart } from "react-google-charts";
import MUIDataTable from "mui-datatables";
import SimpleTable from './Components/SimpleTable';
import TestComponent from './Components/TestComponent'
import TextareaAutosize from 'react-autosize-textarea';
import StickyFooter from 'react-sticky-footer';



let style = {
  button:{
    margin:'10px',
    fontSize:'10px',
    width:'150px'
  },
};

class Freedom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display:'none',
      name:'',
      definition:'',
      buttonColor:'grey',
      statement:''
    }
  }

  handleChange=(e,type)=>{
    if (type === 'definition'){
      this.setState({
        display:'none',
        definition:e.target.value,
        buttonColor:'red'
      })
    }else if (type === 'name'){
      this.setState({
        display:'none',
        name:e.target.value,
        statement:''
      })
    }

    console.log('name',this.state.name)
  }

  handleClick = () =>{

    let string = `For ${this.state.name} freedom is "${this.state.definition}"`
    this.setState({
      display:'block',
      statement: string,
      name:'',
      definition:'',
      buttonColor:'grey'
    })
    console.log('statement',this.state.definition)
  }

  render() {
    return (

      <div className="App">
        <div className="title-box">
          <div className ="project_title">Freedom Dreaming</div>
        </div>

        <div className="container">
          <div className ="header">
            I,
            <textarea className = "input" value = {this.state.name} placeholder = 'name' onChange={(e) => {this.handleChange(e,'name')}}/>
            dream of freedom as
            <TextareaAutosize  maxRows={2}  className = "input" placeholder = '---' value = {this.state.definition} onChange={(e) => {this.handleChange(e,'definition')}}/>
            <button className = "button" style ={{color:this.state.buttonColor}} onClick={this.handleClick} >+</button>
            <div style ={{
                display:this.state.display,
                fontSize:'60px',
                fontWeight:600,
                border:'solid 10px red',
                margin:'60px 120px 0px 120px',
                padding:"40px 40px 40px 40px"}}>
              {this.state.statement}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Freedom;
