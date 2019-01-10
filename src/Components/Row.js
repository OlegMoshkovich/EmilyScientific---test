import React from 'react';
import ReactTable from "react-table";


const row = (props) => {
  console.log(props)
  const colNum = props.data.length;


  return(
    props.data.map((row, index) => {
      
           return(
             <table className = "center">
               <tbody>
               <tr>
                <td>{index}</td>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                </tr>
               </tbody>
             </table>
           )

        })
  )
}
export default row;
