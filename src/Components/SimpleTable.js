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



function SimpleTable(props) {
  const { classes } = props;
  const tableBody = []
  let uniqueKey = 0;

  for (let el in props.data){
    let statName = el;
    let row = {'Type':statName,...props.data[el]}
    tableBody.push(row)
  }
  const tableKeys = ['Type','id',...props.keys]

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
           {tableKeys.map(key =>{
             uniqueKey++;
             return <TableCell key = {uniqueKey} align ="center">{key}</TableCell>
           })}
          </TableRow>
        </TableHead>
        <TableBody>
        {tableBody.map(row => {
         return (
           <TableRow key={uniqueKey}>
           {Object.keys(row).map((cell)=> {
             uniqueKey++;
             return <TableCell  key = {uniqueKey} align="center">{row[cell]}</TableCell>
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
