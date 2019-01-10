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
  const tableParams = []
  const rows = [];
  const { classes } = props;
  const data = props.data;

  for (let element in data[0]){
    tableParams.push(data[0][element])
  }

  props.data.map((record,index)=>{
    rows.push([...record])
  })

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>

        <TableHead>
          <TableRow>
          {tableParams.map(param =>{
            return <TableCell align ="center">{param}</TableCell>
          })}

          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => {
            console.log(row)
            return (
              <TableRow key={row.id}>
              {row.map(column =>{
                return <TableCell align ="center">{column}</TableCell>
              })}
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
