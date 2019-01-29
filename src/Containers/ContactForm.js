import React from 'react'
import { Field, reduxForm } from 'redux-form'
import '../App.css';
import TextField from '@material-ui/core/TextField';


const renderTextField = ({ input, label }) => (
  <TextField
    id="standard-name"
    label="Name"
    margin="normal"
  />
)

let ContactForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} className = "contantForm">

    <div className = 'formInput'>
      <label className = 'label' >First Name</label>
      <div>
        <Field
          name="firstName"
          component="input"
          type="text"
          placeholder="First Name"
        />
      </div>
    </div>

    <div className = 'formInput'>
      <label className = 'label'>Last Name</label>
      <div>
        <Field
          name="lastName"
          component="input"
          type="text"
          placeholder="Last Name"
        />
      </div>
    </div>
{/*
    <div>
      <Field name="lastName" component={renderTextField} type="text" />
    </div>
*/}
      <button type="submit">Submit</button>
    </form>
  )
}

ContactForm = reduxForm({
  form: 'contact'
})(ContactForm)

export default ContactForm
