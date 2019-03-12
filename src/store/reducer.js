import {  combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'


const initialState = {
  counter:1
}

const reducer = (state = initialState, action) =>{
  switch(action.type) {
    case 'INCREMENT':
      return{
        ...state,
        counter:state.counter + 1
      }
    case 'DECREASE':
      return{
        ...state,
        counter:state.counter - 1
      }
    default:
    return{
      ...state,
    }
  }
}

const rootReducer = combineReducers({
  reducer,
  form: formReducer
})



export default rootReducer;
