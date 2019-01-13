import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
import EnhancedTable from './Components/SortableTable'
import './App.css';
import Button from '@material-ui/core/Button'
import {Collapse} from 'react-collapse'
import { Chart } from "react-google-charts";
import CheckboxList from './Components/CheckBoxList'

import Popover from '@material-ui/core/Popover'


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
      tableIsOpened:false,
      VizIsOpened: true,
      graphOpen:true,
      buttonContainer:'none',
      csvData: [],
      graphData:[],
      anchorEl: null,
      elementsToGraph: [],
      keys:[],
      dataArr:[]

    }
    this.loadFile = this.loadFile.bind(this);
    this.buttonTableHandler = this.buttonTableHandler.bind(this);
    this.buttonGraphHandler = this.buttonGraphHandler.bind(this);
    this.graphInput = this.graphInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.gatherKeys = this.gatherKeys.bind(this);
    this.handleCheckedBoxes = this.handleCheckedBoxes.bind(this);
    this.createDataObj = this.createDataObj.bind(this);
    // this.analyzeData = this.analyzeData.bind(this);
  }

  buttonTableHandler(){
     !this.state.tableIsOpened ? this.setState({tableIsOpened:true}):this.setState({tableIsOpened:false})
  }
  buttonGraphHandler(){
     !this.state.graphOpen ? this.setState({graphOpen:true}):this.setState({graphOpen:false})
  }
  handleCheckedBoxes(checkedBoxes){
    this.setState({elementsToGraph:checkedBoxes})
  }
  handleClick = event => {
    !this.state.vizIsOpened ? this.setState({vizIsOpened :true}):this.setState({vizIsOpened:false})

    this.setState({
      anchorEl: event.currentTarget,
    });
  };
  handleClose = () => {
    !this.state.vizIsOpened ? this.setState({vizIsOpened :true}):this.setState({vizIsOpened:false})
    // !this.state.tableIsOpened ? this.setState({tableIsOpened:true}):this.setState({tableIsOpened:false})
    this.setState({
      anchorEl: null,
    });
  }

  createDataObj(data){
     let count = 0;
     let dataObj = {};
     let dataObjConv = {};
     const dataArrConv = [];
     const dataArr = [];
     const keys = data.shift();
     
     data.map((row) =>{
        row.map((element,index)=>{
          dataObj['id'] = index;
          isNaN(Number(element)) ? dataObj[keys[index]] = element:dataObj[keys[index]] = Number(element)
        })
        dataArr.push(dataObj);
     })

       this.setState({dataArr,keys})

     }

  graphInput(data,keys = []){

  }

  // analyzeData(data,keys = []){
  //   const newArray = [];
  //   const convArr = [];
  //   const numbersArray = [];
  //   const stringsArray = [];
  //   const dataTypes = [];
  //   const dataTypesObj = {};
  //   const strings = [];
  //   const numbers = [];
  //   let arr = [];
  //   //Map over the original data array and convert the whole array to number
  //
  //   data.map((row) =>{
  //      row.map((element,index)=>{
  //        isNaN(Number(element)) ? arr.push(element):arr.push(Number(element))
  //      })
  //      convArr.push(arr);
  //      arr = []
  //   })
  //
  //   console.log('converted array', convArr)
  //   //Populate numbers array with numbers filtered from the original array
  //   newArray.map((row) =>{
  //     numbersArray.push(row.filter(element => isNaN(element) === false));
  //   })
  //
  //   newArray[0].map((element,index) =>{
  //     isNaN(element) ? dataTypesObj[keys[index]] = 'string':dataTypesObj[keys[index]] = 'number'
  //     isNaN(element) ? dataTypes.push('string'):dataTypes.push('number')
  //     isNaN(element) ? strings.push(index):numbers.push(index)
  //   })
  //   data.map((row) =>{
  //     row.map((element,index) =>{
  //        if (strings.includes(index)){
  //          arr.push(element);
  //        }
  //     })
  //     stringsArray.push(arr);
  //     arr = []
  //   })
  //
  //   console.log('strings',stringsArray)
  //   console.log('numbers',numbersArray)
  //
  //   return
  // }

  loadFile(data){
    this.createDataObj(data)
    this.setState({
      csvData: data,
      // graphData:graphData,
      tableIsOpened:true,
      buttonContainer:'block'
      })
    // this.analyzeData(data, this.state.keys);
    };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let tableButtonTitle;
    let vizButtonTitle;
    !this.state.tableIsOpened ? tableButtonTitle = 'Open table' : tableButtonTitle = 'Collapse table'
    !this.state.vizIsOpened ? vizButtonTitle = 'Viz' : vizButtonTitle = 'Make a graph'

    return (
      <div className="App">
        <div className="container">
         <CSVReader
           cssClass="react-csv-input"
           label = "PLEASE UPLOAD CSV FILE"
           inputId ="file_upload"
           onFileLoaded={this.loadFile}/>
       </div>

       <div style = {{display: this.state.buttonContainer}} className = 'buttonContainer'>
         <Button style={style.button} variant="contained" color="primary" onClick={this.buttonTableHandler}>
            {tableButtonTitle}
         </Button>
         <Button style={style.button} variant="contained" color="primary" onClick={this.buttonGraphHandler}>
            Graph Collapse
         </Button>
         <Button style={style.button} variant="contained" color="primary" >
            Filter the table
         </Button>
         <Button style={style.button} variant="contained" color="secondary"   onClick={this.handleClick}>
            {vizButtonTitle}
         </Button>
       </div>

       <Popover
         id="simple-popper"
         open={open}
         anchorEl={anchorEl}
         onClose={this.handleClose}
         anchorOrigin={{
           vertical: 'bottom',
           horizontal: 'center',
         }}
         transformOrigin={{
           vertical: 'top',
           horizontal: 'center',
         }}>
         <CheckboxList keys ={this.state.keys} handleCheckedBoxes = {this.handleCheckedBoxes} />
       </Popover>

       <Collapse isOpened={this.state.tableIsOpened}>
        <EnhancedTable data = {this.state.csvData} dataArr = {this.state.dataArr} keys = {this.state.keys}/>
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
