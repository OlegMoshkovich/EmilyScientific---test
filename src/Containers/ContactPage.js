import React from 'react';
import ContactForm from './ContactForm';



class ContactPage extends React.Component {

  constructor(){
    super()
  }

  submit = values => {

    console.log('printing on submit',values)

  }

  render() {
    return (
    <div>
    <div>The form is created using Redux Form - its purpose is to test the "field" wrapper.</div>
    <div>On Submit the results are logged to the console from the redux store. </div>
      <ContactForm onSubmit={this.submit} />
    </div>
    )
  }
}

export default ContactPage
