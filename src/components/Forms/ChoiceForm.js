import React from "react";
import { connect } from "react-redux";
import store from "../../config/store"
import filled from '../../features/keys/filled.png'
import { v4 as uuidv4 } from 'uuid'
import API from "../../utils/API";


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

      const rightDialogue = store.getState().modal.rightDialogue
      const name = store.getState().modal.name


      store.dispatch({
        type: "SHOW_MODAL",
        payload: {
          show: true,
          dialogue: rightDialogue,
          name: name,
          questionNumber: 0
        }
      })


    } else {
      const id = store.getState().user.id;
      const token = store.getState().user.token;

      // Decrement health by 1 when question is answered wrong
      API.healthDown(id, token).then(res => {
        const token = store.getState().user.token;
        const id = store.getState().user.id;
        API.getVip(token).then(res => {
          if (res.data.health === -1) {
            API.resetLevel(id, token).then(res => {
              store.dispatch({
                type: "ADD_KEY",
                payload: {
                  amount: 0
                }
              });
              store.dispatch({
                type: "USER_ACTION",
                payload: {
                  ...store.getState().user,
                  question1: false,
                  question2: false,
                  question3: false,
                  health: 3
                }
              })
            })

          } else {
            store.dispatch({
              type: "USER_ACTION",
              payload: {
                ...store.getState().user,
                health: res.data.health
              }
            })
          }
          store.dispatch({
            type: "SHOW_MODAL",
            payload: {
              ...store.getState().modal, dialogue: store.getState().modal.wrongDialogue
            }
          });
        })
      }).catch(err => { err ? console.log(`Due to your idiocy, ${err}`) : console.log(`Nah you're good`) })
    }
  }
  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.answers.map(answer => (
          <div key={uuidv4()}>
            <input className="rpgui-radio" type="radio" id={answer} name={answer}
              checked={this.state.value === `${answer}`}
              onChange={this.handleChange}
              value={answer} />
            <label htmlFor={answer}>{answer}</label>
          </div>

        ))}
        <button id="submitBtn" style={{ color: "white" }} type="submit" value="Submit" className="rpgui-button" onClick={this.handleSubmit}>Submit</button>
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
