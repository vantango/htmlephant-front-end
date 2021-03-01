import React from "react";
import { connect } from "react-redux";
import store from "../../config/store"
import filled from '../../features/keys/filled.png'

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
    if (this.state.value === this.props.correct) {
      console.log("yay!")
      // alert("you get a salmon")
      // document.querySelector('.key1').src = filled

      const newAmount = store.getState().key.amount + 1
      store.dispatch({
        type: "ADD_KEY",
        payload: {
          amount: newAmount
        }
      })

      store.dispatch({
        type: "SHOW_MODAL",
        payload: {
          show: false,
        }
      })
    } else {
      store.dispatch({
        type: "SHOW_MODAL",
        payload: {
          ...store.getState().modal, dialogue: store.getState().modal.wrongDialogue
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
