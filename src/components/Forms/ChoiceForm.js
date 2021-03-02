import React from "react";
import { connect } from "react-redux";
import store from "../../config/store"
import filled from '../../features/keys/filled.png'
import { v4 as uuidv4 } from 'uuid'


class ChoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({ value: event.target.value });
    // console.log(this.state.value)
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value === this.props.correct) {
      console.log("yay!")


      const newAmount = store.getState().key.amount + 1
      store.dispatch({
        type: "ADD_KEY",
        payload: {
          amount: newAmount
        }
      })

      
      const number = store.getState().modal.questionNumber
      switch (number) {
        case 1:
          store.dispatch({
            type: "USER_ACTION",
            payload: {
              ...store.getState().user, question1: true 
            }
          })
          break;
        case 2:
          store.dispatch({
            type: "USER_ACTION",
            payload: {
              ...store.getState().user, question2: true 
            }
          })
          break;
        case 3:
          store.dispatch({
            type: "USER_ACTION",
            payload: {
              ...store.getState().user, question3: true 
            }
          })
          break;
      
        default:
          break;
      }


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
        {/* <select value={this.state.value} onChange={this.handleChange}>
          {this.props.answers.map(answer => (
            
            <option key={uuidv4()} value={answer}>{answer}</option>))
          }
        </select> */}
        {this.props.answers.map(answer => (
          <div key={uuidv4()}>
          <label>
          <input type="radio" id="male" name="gender" 
            checked={this.state.value === `${answer}`}
            onChange={this.handleChange}
          value={answer} />
            {answer}
          </label>
          </div>

        ))}
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
