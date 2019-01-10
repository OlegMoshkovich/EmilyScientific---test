import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
import Row from './Components/Row'
import SimpleTable from './Components/MaterialTable'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvdata: []
    }
    this.loadFile = this.loadFile.bind(this);
  }

  loadFile(data){
    this.setState({
      csvdata:data
    })

    document.querySelector('.newTable').style.display = "block"


  };

  render() {
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
       <SimpleTable data = {this.state.csvdata}/>
       </div>


      </div>
    );
  }
}

export default App;
