import React from "react";
import { connect } from "react-redux";
import store from "../../config/store"

class ChoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value===this.props.correct){
      console.log("yay!")
      store.dispatch({
        type: "SHOW_MODAL",
        payload: {
          show: false,
        }
      })
    } else {
      store.dispatch({
        type:"SHOW_MODAL",
        payload: {
          ...store.getState().modal,dialogue:"The details of your incompetence do no interest me."
        }
      })
    }
  }
  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.value} onChange={this.handleChange}>
          {this.props.answers.map(answer => (
          <option value={answer}>{answer}</option>))
        } 
        </select>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.question,
  };
}

export default connect(mapStateToProps)(ChoiceForm);
