import React from "react";
import store from "../config/store"

// handleChange(event) {
//     let inputVal = event.target.value
//     console.log(inputVal)
//    this.setState({value: inputVal});
//  }
// handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
//   }
function NewGame(){
    
        return (
          <form>
            <label>
              User:
            </label>
              <input name ="userAns" type="text" />
            <input type="submit" value="Submit" />
            <label>
              Password:
            </label>
              <input name ="userAns" type="text" />
            <input type="submit" value="Submit" />
          </form>
        );
}
    
  


export default NewGame