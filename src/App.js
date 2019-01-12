import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
// import Row from './Components/Row'
// import SimpleTable from './Components/MaterialTable'
import EnhancedTable from './Components/SortableTable'
import './App.css';
import Button from '@material-ui/core/Button'

import {Collapse} from 'react-collapse';
// import {Presets} from 'react-motion';
import { Chart } from "react-google-charts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened:false,
      graphOpen:false,
      csvData: [],
      graphData:[]
    }
    this.loadFile = this.loadFile.bind(this);
    this.buttonTableHandler = this.buttonTableHandler.bind(this);
    this.buttonGraphHandler = this.buttonGraphHandler.bind(this);
    this.graphInput = this.graphInput.bind(this);


  }

  organizeData(data){
    let dataObj = {};
    const keys = [];
    let counter = 0;
    const dataArr = []
    let count = 0;

    data.map((element,index)=>{
      dataObj['id'] = index
      if (index === 0){
        for(let key of element){
          keys.push(key)
        }
      }else{
        for(let key of element){
          dataObj[keys[count]] = key;
          count++;
        }
        count = 0
        dataArr.push(dataObj)
        dataObj = {};
      }
      return dataArr
    })
    return dataArr
  }

  graphInput(data){
    let counter = 0;
    const graphData = [];
    let newArr =[];
    for (let row in data){
      if(counter === 0){
        newArr = [data[row][0],data[row][1],data[row][2],data[row][3],data[row][4]]
      }
      else{
        newArr = [parseInt(data[row][0]),parseInt(data[row][1]),parseInt(data[row][2]),parseInt(data[row][3]),parseInt(data[row][4]),]
      }
      graphData.push(newArr)
      counter++;
    }
    return graphData
  }

  loadFile(data){
    const graphData = this.graphInput(data);
    const organizedData = this.organizeData(data);
    console.log('organizedData',organizedData)
    this.setState({
      csvData: data,
      graphData:graphData
    })
  };

  buttonTableHandler(){
     !this.state.isOpened ? this.setState({isOpened:true}):this.setState({isOpened:false})
  }
  buttonGraphHandler(){
     !this.state.graphOpen ? this.setState({graphOpen:true}):this.setState({graphOpen:false})
  }



  render() {
    let buttonTitle;
    !this.state.isOpened ? buttonTitle = 'Open the table' : buttonTitle = 'Collapse the table'
    return (
      <div className="App">
      <div className="container">
         <CSVReader
           cssClass="react-csv-input"
           label="Import the csv file"
           onFileLoaded={this.loadFile}
         />
       </div>
       <div className = 'newTable'>
      {/* <SimpleTable data = {this.state.csvData}/> */}
       </div>
       <div >
         <Button variant="contained" color="secondary" onClick={this.buttonTableHandler}>
            {buttonTitle}
         </Button>
       </div>

       <div style = {{marginTop:10,paddingTop:20}}>
         <Button variant="contained" color="secondary" onClick={this.buttonGraphHandler}>
            Graph Collapse
         </Button>
       </div>

       <Collapse isOpened={this.state.isOpened}>
        <EnhancedTable data = {this.state.csvData}/>
       </Collapse>

       {/* */}
       <Collapse isOpened={this.state.graphOpen}>
         <Chart
           chartType="ScatterChart"
           data={this.state.graphData}
           width="100%"
           height="400px"
           legendToggle
         />
        </Collapse>





      </div>
    );
  }
}

export default App;
