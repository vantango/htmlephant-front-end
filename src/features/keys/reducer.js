const intitialState = {
    amount: 0
 }
 
 const questionReducer = (state=intitialState, action) => {
     switch(action.type) {
         case 'ADD_KEY':
             return {
                 ...action.payload
             }
         default:
             return state
     }
 }
 
 export default questionReducer