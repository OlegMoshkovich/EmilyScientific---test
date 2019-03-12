import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import Firebase, { FirebaseContext } from './Components/Firebase';

import {Provider} from 'react-redux';
import { createStore } from 'redux';
// import reducer from './store/reducer';
import rootReducer from './store/reducer'
const store = createStore( rootReducer )


ReactDOM.render(
<Provider store = { store }>
  <App />
</Provider >  , document.getElementById('root'));



serviceWorker.unregister();
