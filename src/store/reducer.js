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

//   if(action.type === "INCREMENT"){
//     return{
//       ...state,
//       counter:state.counter + 1
//     }
//   }
//   return state;
// }

export default reducer;
