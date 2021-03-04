import React from "react";
import { connect } from "react-redux";

class InputForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'test'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
       let inputVal = event.target.value
      this.setState({value: inputVal});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
          </label>
            <input name ="userAns" type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

function mapStateToProps(state) {
return {
    ...state.form,
};
}


export default connect(mapStateToProps)(InputForm);