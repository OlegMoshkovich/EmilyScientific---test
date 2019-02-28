import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignContent:'center',
    flexWrap: 'wrap',
    textAlign:'center',
    marginTop:'50px'
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width:300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});
let style = {
  button:{
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30px',
    fontSize:'10px',
    width:'150px'
  },
};




class About extends React.Component {
  state = {
    name: '',
    age: '',
    multiline: '',
    currency: '',
    redirect: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick = () => {

  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">

        <div className="title-box">
          <div className ="project_title" style = {{
            color:'black',
            borderBottom:'solid 4px black',
            paddingBottom: '10px'
          }}>
            <Link style = {{
              color:'black',
              textDecoration:"none",
            }} to="/">Freedom Dreaming</Link>
          </div>
        </div>
        <div className="container">
          <div className ="header">
          FREEDOM DREAMING aims to uncover the collective definition of FREEDOM.
          </div>
        </div>
      </div>
    );
  }
}


export default About;
