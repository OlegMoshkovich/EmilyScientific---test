const initialState = {
  counter:1
}

const reducer = (state = initialState, action) =>{
  if(action.type === "INCREMENT"){
    return{
      ...state
    }
  }
  return state;
}

export default reducer;
