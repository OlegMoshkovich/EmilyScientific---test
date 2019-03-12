import React, { Component } from 'react';

import './App.css';
// import Button from '@material-ui/core/Button'


import TextareaAutosize from 'react-autosize-textarea';
// import StickyFooter from 'react-sticky-footer';
// import  { FirebaseContext } from './Components/Firebase';
import firestore from "./Components/Firestore";
import firebase from 'firebase';



// let style = {
//   button:{
//     margin:'10px',
//     fontSize:'10px',
//     width:'150px'
//   },
// };

class Freedom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display:'none',
      name:'',
      definition:'',
      buttonColor:'grey',
      statement:'',
      data: [{FreedomDream: "intial dream", FullName: "Tom"}],

    }
  }

  // componentWillMount(){
  //   const dreams = [];
  //   const db = firebase.firestore();
  //   db.collection("FreedomDreams").get().then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //          const data = doc.data()
  //          let dream = data.FreedomDream
  //          let name = data.FullName
  //          let object = {name:name,dream:dream}
  //          dreams.push(object)
  //       });
  //           this.setState({data:dreams})
  //   });
  //
  //   }

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
    const db = firebase.firestore();
    db.collection("FreedomDreams").add({
        FullName: this.state.name,
        FreedomDream: this.state.definition
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
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
            <textarea className = "input"
            value = {this.state.name}
            placeholder = 'name'
            onChange={(e) => {this.handleChange(e,'name')}}/>
            dream of freedom as
            <TextareaAutosize
             maxRows={2}
             className = "input"
             placeholder = '---'
             value = {this.state.definition}
             onChange={(e) => {this.handleChange(e,'definition')}}/>

            <button
              className = "button"
              type = "submit"
              style ={{color:this.state.buttonColor}}
              onClick={this.handleClick} >+</button>

            <div style ={{
                display:this.state.display,
                fontSize:'60px',
                fontWeight:600,
                border:'solid 10px red',
                margin:'60px 120px 0px 120px',
                padding:"40px 40px 40px 40px"}}>
              {this.state.statement}
            </div>

            {/*<div className ="headerabout" style={{fontSize:80, marginBottom:40,fontWeight:200,textDecoration:'none'}}>
            freedom dreams
            </div>*/}
            {/*{this.state.data.map((dream) => (
              <div style ={{
                  display:this.state.display,
                  fontSize:'60px',
                  fontWeight:600,
                  border:'solid 10px red',
                  margin:'60px 120px 0px 120px',
                  padding:"40px 40px 40px 40px"}}>
                For {dream.name} the freedom is {dream.dream}...</div>
          ))}*/}

          </div>
        </div>
      </div>
    );
  }
}



export default Freedom;
