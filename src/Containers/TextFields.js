import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Route, Redirect } from 'react-router'

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

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];


class TextFields extends React.Component {
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
    this.setState({
      redirect: true

    })
    console.log('hello')
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirect === true) {
      return <Redirect to='/advil' />
    }
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="First Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="standard-uncontrolled"
          label="Last Name"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="standard-required"
          label="Drug Type"
          className={classes.textField}
          margin="normal"
        />
         <Button style={style.button} variant="contained" color="primary" onClick={this.handleClick}>Submit</Button>
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
