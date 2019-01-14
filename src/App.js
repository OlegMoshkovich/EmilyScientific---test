import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
import EnhancedTable from './Components/SortableTable'
import './App.css';
import Button from '@material-ui/core/Button'
import {Collapse} from 'react-collapse'
import { Chart } from "react-google-charts";
import CheckboxList from './Components/CheckBoxList'
import Popover from '@material-ui/core/Popover'
import SelectedListItem from './Components/SelectedList'
import MUIDataTable from "mui-datatables";

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
      vizIsOpened: true,
      graphOpen:false,
      statisticsOpen:false,
      buttonContainer:'none',
      buttonVizContainer:'none',
      statisticsContainer:'none',
      csvData: [],
      graphData:[],
      anchorEl: null,
      anchorEl2: null,
      elementsToGraph: [],
      elementsToGraphSecondary: [],
      secondary:true,
      keys:[],
      numberkeys:[],
      stringKeys:[],
      dataArr:[],
      modifiedKeys:[],
      modifiedData:[]
    }
    this.loadFile = this.loadFile.bind(this);
    this.buttonTableHandler = this.buttonTableHandler.bind(this);
    this.buttonGraphHandler = this.buttonGraphHandler.bind(this);
    this.graphInput = this.graphInput.bind(this);
    this.handleClickPrimary = this.handleClickPrimary.bind(this);
    this.handleClickSecondary = this.handleClickSecondary.bind(this);
    this.handleClosePrimary = this.handleClosePrimary.bind(this);
    this.handleCloseSecondary = this.handleCloseSecondary.bind(this);
    this.handleCheckedBoxes = this.handleCheckedBoxes.bind(this);
    this.createDataObj = this.createDataObj.bind(this);
    this.buttonVizHandler = this.buttonVizHandler.bind(this);
  }

  //first callback that is called when csv file is loaded
  loadFile(data){
    //after the createdDataObj is called the original data received from csv is separated into the header - keys and the body
    //which is the rest of the rows
    this.createDataObj(data)
    //modified Data is created to be fed into the MUI table - it accepts array of arrays
    const modifiedData = data;
    //loop over the body portion and include index
    modifiedData.map((element,index) =>{
      return element.unshift(index)
    })

    this.setState({
      csvData: data,
      tableIsOpened:true,
      buttonContainer:'block',
      modifiedData:modifiedData
      })
    };
  // organizes csv data - array of arrays in to the array of object - as well as separates number from string
  createDataObj(data){
       let count = 0;
       let dataObj = {};
       let dataObjConv = {};
       const dataArrConv = [];
       const dataArr = [];
       const keys = data.shift();
       const numberKeys = [];
       const stringKeys = [];

       //include 'id' into the keys array extracted from the original data array
       this.setState({modifiedKeys:['id', ...keys]})

       //map over the body portion of the data(excluding extracted keys) and create a data array that contains row object
       data.map((row, index) =>{
          dataObj['id'] = index+1;
          //analize the row for the data types and separate string and numbers into two separate arrays
          if(index === 0){
            row.map((element,index)=>{
              isNaN(Number(element)) ? stringKeys.push(keys[index]) : numberKeys.push(keys[index])
            })
            stringKeys.push('id');
          }
          //convert the strings extrated from the csv file into the string and number data types
          row.map((element,index)=>{
            isNaN(Number(element)) ? dataObj[keys[index]] = element:dataObj[keys[index]] = Number(element)
          })
          dataArr.push(dataObj)
          dataObj = {};
       })
         this.setState({dataArr, keys, numberKeys, stringKeys})
         return data
       }
  // the graphing library requires array of arrays -- prepares the data for vizualization
  graphInput(data,keys = []){
     let graphData = [keys];
     let graphRow = [];
     data.map((row) =>{
       for (let key of keys){
         graphRow.push(row[key]);
       }
       graphData.push(graphRow)
       graphRow = [];
     })
     this.setState({graphData})
   }

  // Handlers for the buttons responsible for the button behavior - expand/collapse
  buttonTableHandler(){
     !this.state.tableIsOpened ? this.setState({tableIsOpened:true}):this.setState({tableIsOpened:false})
  }
  buttonGraphHandler(){
     !this.state.graphOpen ? this.setState({graphOpen:true}):this.setState({graphOpen:false})
  }
  buttonStatisticsHandler(){
     this.state.statisticsOpen ? this.setState({statisticsOpen:true}):this.setState({statisticsOpen:false})
  }
  buttonVizHandler(){
      !this.state.vizIsOpened ? this.setState({vizIsOpened :true}):this.setState({vizIsOpened:false})
      if(this.state.buttonVizContainer === 'none'){
        this.setState({buttonVizContainer: 'block'})
      } else {
        this.setState({buttonVizContainer: 'none'})
      }
    }

  //Passed to the list component to gather the properties to graph - updates states
  handleCheckedBoxes(checkedBox){
    this.state.elementsToGraph.push(checkedBox)
  }

  //Handlers for the vizualizer popover called on open and closed
  handleClickPrimary = event => {
    this.setState({
      anchorEl: event.currentTarget,
      secondary:false,
      elementsToGraph:[],
    });
  };
  handleClickSecondary = event => {
    this.setState({
      anchorEl2: event.currentTarget,
    });
  };
  handleClosePrimary = () => {

    this.setState({
      anchorEl: null,
    });

  }
  handleCloseSecondary = () => {

    if(this.state.tableIsOpened){
      this.setState({tableIsOpened:false})
    }
    this.setState({
      anchorEl2: null,
      graphOpen:true,
      secondary:true
    });
    this.graphInput(this.state.dataArr,this.state.elementsToGraph)
  }

  render() {
    //properties for the popover
    const { anchorEl,anchorEl2 } = this.state;
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    //table options --
    const options = {
       filterType: "dropdown",
       filter: true,
       sort: true,
       download:false,
       print:false,
       resizableColumns:false,
       rowHover:false,
       viewColumns:true,
       onCellClick:function(colData: any, cellMeta: { colIndex: number, rowIndex: number }){console.log('column Index',cellMeta.colIndex)}
    };
    let tableButtonTitle;
    let vizButtonTitle;
    let graphButtonTitle;
    let color;

    //Switches for the buton titles + properties
    this.state.tableIsOpened ? tableButtonTitle = 'Collapse table' : tableButtonTitle = 'Expand table'
    this.state.vizIsOpened ? vizButtonTitle = 'Vizualizer' : vizButtonTitle = 'Collapse Viz Menu'
    this.state.vizIsOpened ? color = 'primary' : color = 'secondary'
    this.state.graphOpen ? graphButtonTitle = 'Collapse graph' : graphButtonTitle = 'Expand graph'

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
         <Button style={style.button}  variant="contained" color="primary" onClick={this.buttonGraphHandler}>
            {graphButtonTitle}
         </Button>
         <Button style={style.button} variant="contained" color={color} onClick={this.buttonVizHandler}>
            {vizButtonTitle}
         </Button>
         <Button style={style.button} variant="contained" color={color} disabled = {true} onClick={this.buttonStatisticsHandler}>
            Statistics
         </Button>
       </div>

       <div style = {{display: this.state.buttonVizContainer}} className = 'buttonVizContainer'>
         <Button style={style.button} variant="contained" disabled = {true} color="primary" onClick={this.handleClickPrimary}>
          Graph Type
         </Button>
         <Button style={style.button} variant="contained"  color="primary" onClick={this.handleClickPrimary}>
            Primary Axis
         </Button>
         <Button style={style.button} variant="contained" disabled = {this.state.secondary} color="primary" onClick={this.handleClickSecondary}>
            Secondary Axis
         </Button>
         <div style={{marginTop:'20px', marginBottom:'40px',fontSize:'10px',fontFamily:'Roboto'}}>PLEASE SELECT A SINGLE PRIMARY VALUE AND MULTIPLE SECONDARY VALUES - IF YOU WISH.</div>
       </div>

       <div style = {{display: this.state.statisticsContainer}} className = 'statisticsContainer'>
         <div style={{marginTop:'20px', marginBottom:'40px',fontSize:'10px',fontFamily:'Roboto'}}>statistics</div>
       </div>

       {/* Primary menu for defining the graph*/}
       <Popover
         id="simple-popper"
         open={open}
         anchorEl={anchorEl}
         onClose={this.handleClosePrimary}
         anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
         <CheckboxList keys ={this.state.stringKeys} handleCheckedBoxes = {this.handleCheckedBoxes} />
       </Popover>

       {/* Secondary menu for defining the graph*/}
       <Popover
         id="simple-popper"
         open={open2}
         anchorEl={anchorEl2}
         onClose={this.handleCloseSecondary}
         anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
         <CheckboxList keys ={this.state.numberKeys} handleCheckedBoxes = {this.handleCheckedBoxes} />
       </Popover>

       <Collapse isOpened={this.state.tableIsOpened}>


       {/* Material enhanced table originally constructed to display data - includes sorting - later replaced by the MUI table*/}
       {/*
         <div style={{margin:'40px'}}>
           <EnhancedTable data = {this.state.csvData} dataArr = {this.state.dataArr} keys = {this.state.keys}/>
         </div>
       */}

       {/* MUI data table that is a "turn key - a bit of a black box component that includes most of the requested functionality" */}
        <div style={{margin:'40px'}}>
          <MUIDataTable
            title={""}
            data={this.state.modifiedData}
            columns={this.state.modifiedKeys}
            options={options}
          />
        </div>
       </Collapse>


       {/* Google charting library component */}
       <div style={{margin:'40px'}}>
         <Collapse isOpened={this.state.graphOpen}>
           <Chart
             chartType="Scatter"
             data={this.state.graphData}
             width="100%"
             height="400px"
             legendToggle/>
          </Collapse>
        </div>

      </div>
    );
  }
}

export default App;
