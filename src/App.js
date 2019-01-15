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
      vizIsOpened: false,
      graphOpen:false,
      statisticsOpen:false,
      buttonContainer:'none',
      buttonVizContainer:'none',
      statisticsContainer:'none',
      graphButtonState:true,
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
      statisticsDataArr:[],
      stats:[],
      modifiedKeys:[],
      modifiedData:[],
    }
    this.loadFile = this.loadFile.bind(this);
    this.buttonTableHandler = this.buttonTableHandler.bind(this);
    this.buttonStatisticsHandler = this.buttonStatisticsHandler.bind(this);
    this.graphInput = this.graphInput.bind(this);
    this.statisticsInput = this.statisticsInput.bind(this);
    this.handleClickPrimary = this.handleClickPrimary.bind(this);
    this.handleClickSecondary = this.handleClickSecondary.bind(this);
    this.handleClosePrimary = this.handleClosePrimary.bind(this);
    this.handleCloseSecondary = this.handleCloseSecondary.bind(this);
    this.handleCheckedBoxes = this.handleCheckedBoxes.bind(this);
    this.createDataObj = this.createDataObj.bind(this);
    this.buttonGraphHandler = this.buttonGraphHandler.bind(this);
    this.buttonVizHandler = this.buttonVizHandler.bind(this);
  }

  //first callback that is called when csv file is loaded
  loadFile(data){
    //after the createdDataObj is called the original data received from csv is separated into the header - keys and the body
    //which is the rest of the rows
    this.setState({
        tableIsOpened:false,
        vizIsOpened: false,
        graphOpen:false,
        statisticsOpen:false,
        buttonContainer:'none',
        buttonVizContainer:'none',
        statisticsContainer:'none',
        graphButtonState:true})

    this.createDataObj(data);
    this.statisticsInput(this.state.dataArr, this.state.keys);
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

  //organizes csv data - array of arrays in to the array of object - as well as separates number from string
  createDataObj(data){

       let dataObj = {};
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
              return stringKeys
            })
            stringKeys.push('id');
          }
          //convert the strings extrated from the csv file into the string and number data types
          row.map((element,index)=>{
            isNaN(Number(element)) ? dataObj[keys[index]] = element:dataObj[keys[index]] = Number(element)
            return dataObj
          })

          dataArr.push(dataObj)
          dataObj = {};
          return dataArr
       })
       this.setState({dataArr, keys, numberKeys, stringKeys})
       return dataArr

     }

  //the graphing library requires array of arrays -- prepares the data for vizualization
  graphInput(data,keys = []){
     let graphData = [keys];
     let graphRow = [];
     data.map((row) =>{
       for (let key of keys){
         graphRow.push(row[key]);
       }
       graphData.push(graphRow)
       graphRow = [];
       return graphData
     })
     this.setState({graphData})
   }

  //Statistics Methods - processes data to be fed to the simple statistics table
  statisticsInput(data,keys =[]){
      const totals = {};
      const average = {};
      const min  = {};
      const max = {};
      const range = {};
      let stats = {};
      let length;
      const sumObj = {};

      //create a summary object with all of the data proprties
      sumObj['id']=[]
      //populate the sumObj with keys and set it equal to the empty array
      for (let key of keys){
        sumObj[key] = []
      }
      //Populate summary object by collecting all of the row values for the same key in the array
      data.map((row,index) =>{
          for (let el in row){
            sumObj[el].push(row[el])
          }
          length = index;
          return sumObj
      })
      //calculate average

      //calculate  max, min, range, totals
      for (let el in sumObj){
        //check if the value is a stringKeys
        if (typeof(sumObj[el][0]) === 'string'){
          totals[el] = 'N/A'
          min[el] = 'N/A'
          max[el] = 'N/A'
          range[el] = 'N/A'

        }else{
          min[el] = Math.min(...sumObj[el]);
          max[el] = Math.max(...sumObj[el]);
          range[el] = max[el] - min[el];
          totals[el] = sumObj[el].reduce((prev,cur)=>{
            return cur + prev
          },0)
        }
      }

      for (let el in totals){
        typeof(totals[el]) === "string" ?
        average[el] = "N/A" :
        average[el] = Math.ceil(totals[el]/length)
      }

      average['id']='N/A'
      totals['id']='N/A'
      max['id']='N/A'
      min['id']='N/A'
      range['id'] = 'N/A'
      stats = {'min':min,'max':max,'range':range,'average':average,'total':totals};

      // console.log('statistics',stats)
      this.setState({stats:stats})
      return stats


  }

  //Handlers for the buttons responsible for the button behavior - expand/collapse
  buttonTableHandler(){
     !this.state.tableIsOpened ? this.setState({tableIsOpened:true}):this.setState({tableIsOpened:false})
  }
  buttonGraphHandler(){
     // console.log('graph open', this.state.graphOpen)
     this.state.graphOpen ? this.setState({graphOpen:false}):this.setState({graphOpen:true})
  }
  buttonStatisticsHandler(){
     this.state.statisticsOpen ? this.setState({statisticsOpen:false}):this.setState({statisticsOpen:true})
     if(this.state.statisticsContainer === 'none'){
       this.setState({statisticsContainer: 'block'})
     } else {
       this.setState({statisticsContainer: 'none'})
     }
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

  //Second Axis handler -- calls graph input inside
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
    this.setState({graphButtonState: false})
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
    };

    // Button tittles
    let tableButtonTitle;
    let vizButtonTitle;
    let graphButtonTitle;
    let vizColor;
    let statColor;

    //Switches for the buton titles + properties
    this.state.tableIsOpened ? tableButtonTitle = 'Collapse table' : tableButtonTitle = 'Expand table'
    this.state.vizIsOpened ? vizButtonTitle = 'Collapse Viz Menu' : vizButtonTitle = 'Vizualizer'
    this.state.vizIsOpened ? vizColor = 'secondary' : vizColor = 'primary'
    this.state.graphOpen ? graphButtonTitle = 'Collapse graph' : graphButtonTitle = 'Expand graph'
    this.state.statisticsOpen ? statColor = 'secondary' : statColor = 'primary'

    return (

      <div className="App">
      
      <div className="title-box">
        <div className ="project_title">Prepared for Genesis by Oleg Moshkovich.</div>
       </div>

       <div className="container" style={{paddingTop:'40px'}}>
         <CSVReader
           cssClass="react-csv-input"
           label = "PLEASE UPLOAD CSV FILE"
           inputId ="file_upload"
           onFileLoaded={this.loadFile}/>
       </div>

       {/* First Level Buttons*/}
       <div style = {{display: this.state.buttonContainer}} className = 'buttonContainer'>
         <Button style={style.button} variant="contained" color="primary" onClick={this.buttonTableHandler}>
            {tableButtonTitle}
         </Button>
         <Button style={style.button}  variant="contained" disabled={this.state.graphButtonState} color="primary" onClick={this.buttonGraphHandler}>
            {graphButtonTitle}
         </Button>
         <Button style={style.button} variant="contained" color={vizColor} onClick={this.buttonVizHandler}>
            {vizButtonTitle}
         </Button>
         <Button style={style.button} variant="contained" color={statColor} disabled = {false} onClick={this.buttonStatisticsHandler}>
            Statistics
         </Button>
       </div>

       {/* Vizualizer Control Buttons*/}
       <div style = {{display: this.state.buttonVizContainer}} className = 'buttonVizContainer'>
       <div style={{marginTop:'20px', marginBottom:'20px',fontSize:'10px',fontFamily:'Roboto'}}>PLEASE SELECT A <span style={{color:'red'}}>SINGLE PRIMARY VALUE </span>AND - IF YOU WISH - <span style={{color:'red'}}>MULTIPLE SECONDARY VALUES</span>.</div>

         <Button style={style.button} variant="contained" disabled = {true} color="primary" onClick={this.handleClickPrimary}>
          Graph Type
         </Button>
         <Button style={style.button} variant="contained"  color="primary" onClick={this.handleClickPrimary}>
            Primary Axis
         </Button>
         <Button style={style.button} variant="contained" disabled = {this.state.secondary} color="primary" onClick={this.handleClickSecondary}>
            Secondary Axis
         </Button>
       </div>

       {/* Statistics container - activated by the Statistics button*/}
       <div style = {{display: this.state.statisticsContainer}} className = 'statisticsContainer'>

         <div style={{marginTop:'20px', marginBottom:'40px',fontSize:'10px',fontFamily:'Roboto'}}>
         </div>
         <div style={{margin:'40px'}}>
         <SimpleTable data = {this.state.stats} keys = {this.state.keys}/>
         </div>
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
       <div style={{margin:'40px'}}>
         <EnhancedTable data = {this.state.csvData} dataArr = {this.state.dataArr} keys = {this.state.keys}/>
       </div>

       {/* MUI data table  --- Includes Search and Filter and search ----  */}
       {/* --------------------------------------------------------------------------------------- */}
       {/* please uncomment to check*/}
       {/* During testing it was uncovered that this version of the table sometimes throws ERRORS therefore it was decided to*/}
       {/* to keep working on it and to submit -- publish --  the stable version that does not include filter*/}

       {/*
         <div style={{margin:'40px'}}>
           <MUIDataTable
             title={""}
             options ={options}
             data={this.state.modifiedData}
             columns={this.state.modifiedKeys}
           />
         </div>
         */}


       </Collapse>


       {/* Google charting library component */}
       <div style={{margin:'40px'}}>
         <Collapse isOpened={this.state.graphOpen}>
           <Chart
             chartType="Scatter"
             data={this.state.graphData}
             loader={<div>Loading Chart</div>}
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
