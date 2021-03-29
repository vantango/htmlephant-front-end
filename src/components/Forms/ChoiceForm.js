// Dependencies
import React from "react";
import { connect } from "react-redux";
import store from "../../config/store"
import { v4 as uuidv4 } from 'uuid'
import API from "../../utils/API";
import { tiles1 } from "../../data/maps/1";


class ChoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };


  handleChange(event) {
    this.setState({ value: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();

    // If question is answered correctly
    if (this.state.value === this.props.correct) {
      // Add key when question is answered correctly
      const newAmount = store.getState().key.amount + 1
      store.dispatch({
        type: "ADD_KEY",
        payload: {
          amount: newAmount
        }
      });

      // Update user state with each correct question
      const number = store.getState().modal.questionNumber
      switch (number) {
        case 1:
          store.dispatch({
            type: "USER_ACTION",
            payload: {
              ...store.getState().user, question1: true
            }
          });
          break;
        case 2:
          store.dispatch({
            type: "USER_ACTION",
            payload: {
              ...store.getState().user, question2: true
            }
          });
          break;
        case 3:
          store.dispatch({
            type: "USER_ACTION",
            payload: {
              ...store.getState().user, question3: true
            }
          });
          break;

        default:
          break;
      };

      const rightDialogue = store.getState().modal.rightDialogue
      const name = store.getState().modal.name

      // Show dialogue for correct answers
      store.dispatch({
        type: "SHOW_MODAL",
        payload: {
          show: true,
          dialogue: rightDialogue,
          name: name,
          questionNumber: 0
        }
      });
    }

    // If question is answered incorrectly
    else {
      const id = store.getState().user.id;
      const token = store.getState().user.token;

      // Decrement health by 1 when question is answered wrong
      API.healthDown(id, token).then(res => {
        // Return updated user data
        API.getVip(token).then(res => {
          // If health is below 0, remove keys and reset health to 3
          if (res.data.health <= 0) {
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
              });
              store.dispatch({
                type: "SHOW_MODAL",
                payload: {
                  show: true,
                  name: 'Joe',
                  dialogue: "Uh-Oh! You ran out of health. I'm taking away your salmon!",
                  questionNumber: 0
                }
              })
              store.dispatch({
                type: "MOVE_PLAYER",
                payload: {
                  position: [288, 128],
                  direction: "EAST",
                  walkIndex: 0,
                  spriteLocation: '0px 0px',
                },
              });
              document.querySelector('.player_animation').classList.add('notransition')
              store.dispatch({
                type: "ADD_TILES",
                payload: {
                  tiles: tiles1,
                },
              });
            });

            // If health is not below 0, update state with new user data
          } else {
            store.dispatch({
              type: "USER_ACTION",
              payload: {
                ...store.getState().user,
                health: res.data.health
              }
            });
          }

          // Display dialogue for wrong answer
          store.dispatch({
            type: "SHOW_MODAL",
            payload: {
              ...store.getState().modal, dialogue: store.getState().modal.wrongDialogue
            }
          });
        });
      }).catch(err => { err ? console.log(`Due to your idiocy, ${err}`) : console.log(`Nah you're good`) });
    }
  }

  
  // const shuffled = this.props.answers.sort(() => Math.random() - 0.5)
  render() {
    // randomizes answers from database

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

// Grab props from Redux state
function mapStateToProps(state) {
  return {
    ...state.question,
  };
}

export default connect(mapStateToProps)(ChoiceForm);
