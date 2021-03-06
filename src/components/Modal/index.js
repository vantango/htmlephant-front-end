import React from "react";
import { connect } from "react-redux";
import Question from "../Question";
import "./style.css"
import API from "../../utils/API"
import store from "../../config/store"
// import PropTypes from "prop-types";

function Modal(props) {
  console.log(props.show);
  const number = props.questionNumber
  let answers, question, correct

  function showQuestion() {
    const level = store.getState().user.level

    switch (level) {
      case 1:
        API.easyAlgo().then(res => {
          switch (number) {
            case 1:
              answers = res.data.answers1
              question = res.data.question1
              correct = res.data.correctAnswer1
              dispatchQuestion()
              break;
            case 2:
              answers = res.data.answers2
              question = res.data.question2
              correct = res.data.correctAnswer2
              dispatchQuestion()
              break;
            case 3:
              answers = res.data.answers3
              question = res.data.question3
              correct = res.data.correctAnswer3
              dispatchQuestion()
              break;
            case "algorithm":
              dispatchAlgorithm()
    
            default:
              break;
          }
        });
        break;

      case 2:
        API.medAlgo().then(res => {
          switch (number) {
            case 1:
              answers = res.data.answers1
              question = res.data.question1
              correct = res.data.correctAnswer1
              dispatchQuestion()
              break;
            case 2:
              answers = res.data.answers2
              question = res.data.question2
              correct = res.data.correctAnswer2
              dispatchQuestion()
              break;
            case 3:
              answers = res.data.answers3
              question = res.data.question3
              correct = res.data.correctAnswer3
              dispatchQuestion()
              break;
            case "algorithm":
              dispatchAlgorithm()
    
            default:
              break;
          }
        });
        break;

      case 3:
        API.hardAlgo().then(res => {
          switch (number) {
            case 1:
              answers = res.data.answers1
              question = res.data.question1
              correct = res.data.correctAnswer1
              dispatchQuestion()
              break;
            case 2:
              answers = res.data.answers2
              question = res.data.question2
              correct = res.data.correctAnswer2
              dispatchQuestion()
              break;
            case 3:
              answers = res.data.answers3
              question = res.data.question3
              correct = res.data.correctAnswer3
              dispatchQuestion()
              break;
            case "algorithm":
              dispatchAlgorithm()
    
            default:
              break;
          }
        });
        break;
        
    
      default:
        break;
    }

      function dispatchAlgorithm() {
        const level = store.getState().user.level
        switch (level) {
          case 1:
            API.easyAlgo().then(res => {
              const algorithm = res.data.algorithm
              store.dispatch({
                type: "ASK_QUESTION",
                payload: {
                  question: algorithm,
                  form: "editor",
                }
              });
              document.querySelector(".question").style.display = "block";
            })
            break;

          case 2:
            API.medAlgo().then(res => {
              const algorithm = res.data.algorithm
              store.dispatch({
                type: "ASK_QUESTION",
                payload: {
                  question: algorithm,
                  form: "editor",
                }
              });
              document.querySelector(".question").style.display = "block";
            })
            break;

          case 3:
            API.hardAlgo().then(res => {
              const algorithm = res.data.algorithm
              store.dispatch({
                type: "ASK_QUESTION",
                payload: {
                  question: algorithm,
                  form: "editor",
                }
              });
              document.querySelector(".question").style.display = "block";
            })
            break;
        
          default:
            break;
        }
      }
      function dispatchQuestion() {

        store.dispatch({
          type: "ASK_QUESTION",
          payload: {
            answers: answers,
            question: `${question}`,
            correct: `${correct}`,
            form: "mc",
          },
        })
        document.querySelector(".question").style.display = "block";
      }
  }

  function closeModal() {
    store.dispatch({
      type: "SHOW_MODAL",
      payload: {
        show: false,
      }
    })
  }

  if (!props.show) {
    return null;
  } else if (props.questionNumber === 0) {
    return (
      <div className="modal-wrapper">
      <div className={"modal rpgui-container framed-grey"} id={"modal"} style={{ color: "Salmon" }}>
        <h3>{props.name} says:</h3>
        <h2>{props.dialogue}</h2>
        <button onClick={closeModal} className="rpgui-button" style={{color: "white"}}>Close</button>
      </div>
      </div>
    )
  }
  else {
    return (
      <div className={"modal rpgui-container framed-grey"} id={"modal"} style={{ color: "Salmon" }}>
        <h3>{props.name} says:</h3>
        <h2>{props.dialogue}</h2>
        <button onClick={showQuestion} className="rpgui-button" style={{color: "white"}}>Next</button>
        <hr className="golden"/>
        <Question />
        <div className={"actions"}>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.modal,
  };
}

export default connect(mapStateToProps)(Modal);
