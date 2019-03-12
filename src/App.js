import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Form from './Containers/Form'
// import SimpleRedux from './Containers/SimpleRedux'
// import ContactPage from './Containers/ContactPage'
// import TextFields from './Containers/TextFields'
import About from './Containers/About'
import Dreams from './Containers/Dreams'
// import CSV from './CSV'
import Freedom from './freedom_landing'
// import SignUpForm from './Components/SignUp'

import './App.css';


const AppRouter = () => (
  <Router>
    <div >
      <nav className = 'navbar'>
        <ul>
          <li>
            <Link to="/about">About</Link>
            <Link to="/dreams" style = {{borderBottom:'solid 2px red',paddingBottom: '10px'}}>Dreams</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={Freedom} />
      <Route path="/about" component={About} />
      <Route path="/dreams" component={Dreams} />

    </div>
  </Router>
);

export default AppRouter;
