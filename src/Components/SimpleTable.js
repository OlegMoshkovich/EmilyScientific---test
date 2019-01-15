import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



function SimpleTable(props) {
  const { classes } = props;
  const tableBody = []

  for (let el in props.data){

    let statName = el;
    let row = {'statType':statName,...props.data[el]}

    tableBody.push(row)
  }

  console.log('finished data',tableBody)
  const tableKeys = ['statType','id',...props.keys]



  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>


        <TableHead>
          <TableRow>

           {tableKeys.map(key =>{
             return <TableCell align ="center">{key}</TableCell>
           })}


          </TableRow>
        </TableHead>


        <TableBody>
        {tableBody.map(row => {
         return (
           <TableRow key={row.id}>
           {Object.keys(row).map((cell)=> {
             //address this later Unique Key
             // uniqueKey++;
             return <TableCell  align="center">{row[cell]}</TableCell>
           })
         }
           </TableRow>
         );
       })}
        </TableBody>


      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
