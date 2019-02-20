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
    }
  }

  render() {


    return (

      <div className="App">
        <div className="title-box">
          <div className ="project_title">Freedom Dreaming</div>
        </div>
        <div className="container">
          <div className ="header">I,
          <input className = "input" placeholder = 'name'/>
          dream of freedom as <input className = "input" placeholder = '---'/>
          <button className = "button">+</button>
          </div>


        </div>
      </div>

    );
  }
}



export default Freedom;
