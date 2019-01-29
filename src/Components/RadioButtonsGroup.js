import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formControl: {
    margin: theme.spacing.unit*3,
    flex:0.5,
    alignItems: 'left',
    justifyContent: 'left'
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {

  state = {
    question:this.props.question,
    answer: '',
  };

  handleChange = event => {
    this.setState({ answer: event.target.value });
    console.log('component state',this.state)
  };

  answerOptions = () =>{
    let answerOptions = [];
    for (let index in this.props.answers){
      answerOptions.push(
        <FormControlLabel
          className='formControlLabel'
          key ={index}
          value={this.props.answers[index]}
          control={<Radio color="primary" />}
          label={this.props.answers[index]}
          labelPlacement="end"
        />
      )
    }
    return answerOptions
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{this.props.question}</FormLabel>
          <RadioGroup
            className={classes.group}
            value={this.state.answer}
            onChange={this.handleChange}
          >
            {this.answerOptions()}

          </RadioGroup>

        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
