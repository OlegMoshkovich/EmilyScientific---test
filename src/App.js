import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from './Containers/Form'
import SimpleRedux from './Containers/SimpleRedux'
import ContactPage from './Containers/ContactPage'
import TextFields from './Containers/TextFields'
import CSV from './CSV'
import Freedom from './freedom_landing'

import './App.css';


const AppRouter = () => (
  <Router>
    <div >
      <nav className = 'navbar'>
        <ul>


          <li>
            <Link to="/">About</Link>
          </li>

        </ul>
      </nav>
      <Route path="/" exact component={Freedom} />
      <Route path="/Counter" component={SimpleRedux} />
      <Route path="/ContactPage" component={ContactPage} />
      <Route path="/TextFields" component={TextFields} />
      <Route path="/CSV" component={CSV} />
      <Route path="/freedom_landing" component={CSV} />


    </div>
  </Router>
);

export default AppRouter;
