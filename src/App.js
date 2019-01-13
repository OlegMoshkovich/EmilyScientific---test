import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
import EnhancedTable from './Components/SortableTable'
import './App.css';
import Button from '@material-ui/core/Button'
import {Collapse} from 'react-collapse'
import { Chart } from "react-google-charts";
import CheckboxList from './Components/CheckBoxList'
import SimplePopover from "./Components/PopoverMenu"
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
      keys:[]
    }
    this.loadFile = this.loadFile.bind(this);
    this.buttonTableHandler = this.buttonTableHandler.bind(this);
    this.buttonGraphHandler = this.buttonGraphHandler.bind(this);
    this.graphInput = this.graphInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.gatherKeys = this.gatherKeys.bind(this);
    this.handleCheckedBoxes = this.handleCheckedBoxes.bind(this);

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
    !this.state.tableIsOpened ? this.setState({tableIsOpened:true}):this.setState({tableIsOpened:false})
    console.log('activating handle close')
    this.setState({
      anchorEl: null,
    });
    this.graphInputTest(this.state.csvData,this.state.elementsToGraph);
  }

  gatherKeys(data){
    const keys = [];
    data.map((key)=>{
        keys.push(key)
    })
    this.setState({keys:keys})
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
    console.log(graphData)
    return graphData
  }
  loadFile(data){
    const graphData = this.graphInput(data);
    this.setState({
      csvData: data,
      graphData:graphData,
      tableIsOpened:true,
      buttonContainer:'block'
      })
      this.gatherKeys(data[0]);
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
