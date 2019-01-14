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
      buttonContainer:'none',
      buttonVizContainer:'none',
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

  buttonTableHandler(){
     !this.state.tableIsOpened ? this.setState({tableIsOpened:true}):this.setState({tableIsOpened:false})
  }
  buttonGraphHandler(){
     !this.state.graphOpen ? this.setState({graphOpen:true}):this.setState({graphOpen:false})
  }
  handleCheckedBoxes(checkedBox){
    this.state.elementsToGraph.push(checkedBox)
  }

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
    // !this.state.vizIsOpened ? this.setState({vizIsOpened :true}):this.setState({vizIsOpened:false})
    // !this.state.tableIsOpened ? this.setState({tableIsOpened:true}):this.setState({tableIsOpened:false})
    this.setState({
      anchorEl: null,
    });

  }
  handleCloseSecondary = () => {
    // !this.state.vizIsOpened ? this.setState({vizIsOpened :true}):this.setState({vizIsOpened:false})
    // !this.state.tableIsOpened ? this.setState({tableIsOpened:true}):this.setState({tableIsOpened:false})
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

  buttonVizHandler(){
      !this.state.vizIsOpened ? this.setState({vizIsOpened :true}):this.setState({vizIsOpened:false})
      if(this.state.buttonVizContainer === 'none'){
        this.setState({buttonVizContainer: 'block'})
      } else {
        this.setState({buttonVizContainer: 'none'})
      }
    }


  createDataObj(data){
     let count = 0;
     let dataObj = {};
     let dataObjConv = {};
     const dataArrConv = [];
     const dataArr = [];
     const keys = data.shift();

     const numberKeys = [];
     const stringKeys = [];
     console.log('data-------',data);
     this.setState({modifiedKeys:['id', ...keys]})


     data.map((row, index) =>{
        dataObj['id'] = index+1;
        if(index === 0){
          row.map((element,index)=>{
            isNaN(Number(element)) ? stringKeys.push(keys[index]) : numberKeys.push(keys[index])
          })
          stringKeys.push('id');
        }
        row.map((element,index)=>{
          isNaN(Number(element)) ? dataObj[keys[index]] = element:dataObj[keys[index]] = Number(element)
        })
        dataArr.push(dataObj)
        dataObj = {};
     })
       this.setState({dataArr, keys, numberKeys, stringKeys})
     }

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

  loadFile(data){
    this.createDataObj(data)
    const modifiedData = data;

    modifiedData.map((element,index) =>{
      return element.unshift(index)
    })
    console.log('modified data', modifiedData)
    this.setState({
      csvData: data,
      tableIsOpened:true,
      buttonContainer:'block'
      })

      // console.log('csvData-------',this.state.csvData);
      this.setState({modifiedData:modifiedData})

    };

  render() {
    const { anchorEl,anchorEl2 } = this.state;
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);

    const options = {
      filterType: 'checkbox',
       filter: true,
       sort: true,
       download:false,

    };

    let tableButtonTitle;
    let vizButtonTitle;
    let graphButtonTitle;
    let color;
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
       </div>

       <div style = {{display: this.state.buttonVizContainer}} className = 'buttonVizContainer'>
         <Button style={style.button} variant="contained"  color="primary" onClick={this.handleClickPrimary}>
            Primary Axis
         </Button>
         <Button style={style.button} variant="contained" disabled = {this.state.secondary} color="primary" onClick={this.handleClickSecondary}>
            Secondary Axis
         </Button>
         <div style={{marginTop:'20px', marginBottom:'40px',fontSize:'10px',fontFamily:'Roboto'}}>PLEASE SELECT A SINGLE PRIMARY VALUE AND MULTIPLE SECONDARY VALUES - IF YOU WISH.</div>

       </div>

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
       {/*
          <EnhancedTable data = {this.state.csvData} dataArr = {this.state.dataArr} keys = {this.state.keys}/>
       */}
        <div style={{margin:'40px'}}>
          <MUIDataTable
            title={""}
            data={this.state.modifiedData}
            columns={this.state.modifiedKeys}
            options={options}
          />
        </div>
       </Collapse>



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
