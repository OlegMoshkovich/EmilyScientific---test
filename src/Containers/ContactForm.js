import React from 'react'
import { Field, reduxForm } from 'redux-form'
import '../App.css';
import TextField from '@material-ui/core/TextField';



let ContactForm = props => {
  const { handleSubmit } = props

  // const handleSubmit = () =>{
  //   console.log('Submitting')
  //
  // }


  return (
    <form onSubmit={handleSubmit} className = "contantForm">

    <div className = 'formInput'>
      <label className = 'label' >First Name</label>
      <div>

        <Field
          name="firstName"
          component="input"
          type="text"

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

        />
      </div>
    </div>
    <button type="submit">Submit</button>
    </form>
  )
}

ContactForm = reduxForm({
  form: 'contact'
})(ContactForm)

export default ContactForm
