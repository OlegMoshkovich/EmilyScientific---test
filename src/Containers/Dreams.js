import React from 'react';
import {  Link } from "react-router-dom";
// import firestore from "../Components/Firestore";
import firebase from 'firebase';



class Dreams extends React.Component {
  state = {
    data: [{FreedomDream: "intial dream", FullName: "Tom"}],
  };

componentWillMount(){
  const dreams = [];
  const db = firebase.firestore();
  
  db.collection("FreedomDreams").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
         const data = doc.data()
         let dream = data.FreedomDream
         let name = data.FullName
         let object = {name:name,dream:dream}
         dreams.push(object)
      });
          this.setState({data:dreams})
  });

  }

  render() {
    console.log('state',this.state.data)

    for(let dream of this.state.data){
      console.log('dream from the loop',dream)
    }
    return (
      <div className="App">
        <div className="title-box">
          <div className ="project_title" style = {{
            color:'black',
            // borderBottom:'solid 4px red',
            paddingBottom: '10px'
          }}>
            <Link style = {{
              color:'black',
              textDecoration:"none",
              }} to="/">Freedom Dreaming</Link>
          </div>
        </div>

        <div className="container">

          {/*<div className ="headerabout" style={{fontSize:80, marginBottom:40,fontWeight:200,textDecoration:'none'}}>
          freedom dreams
          </div>*/}
          {this.state.data.map((dream) => (
          <div style ={{
              display:this.state.display,
              fontSize:'60px',
              fontWeight:600,
              border:'solid 4px red',
              margin:'60px 60px 60px 60px',
              padding:"40px 0px 40px 0px"}}>
              For {dream.name} the freedom is {dream.dream}...</div>
        ))}
        </div>
      </div>
    );
  }
}


export default Dreams;
