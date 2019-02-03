import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from './Containers/Form'
import SimpleRedux from './Containers/SimpleRedux'
import ContactPage from './Containers/ContactPage'
import TextFields from './Containers/TextFields'

import './App.css';


const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">FormOption</Link>
          </li>
          <li>
            <Link to="/Counter">Counter</Link>
          </li>
          <li>
            <Link to="/ContactPage">Form</Link>
          </li>
          <li>
            <Link to="/TextFields">Text Input</Link>
          </li>

        </ul>
      </nav>
      <Route path="/" exact component={Form} />
      <Route path="/Counter" component={SimpleRedux} />
      <Route path="/ContactPage" component={ContactPage} />
      <Route path="/TextFields" component={TextFields} />


    </div>
  </Router>
);

export default AppRouter;
