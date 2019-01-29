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
      <ContactForm onSubmit={this.submit} />
    </div>
    )
  }
}

export default ContactPage
