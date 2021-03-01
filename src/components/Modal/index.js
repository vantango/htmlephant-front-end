import React from "react";
import { connect } from "react-redux";
import Question from "../Question";
import "./style.css"
import API from "../../utils/API"
import store from "../../config/store"
// import PropTypes from "prop-types";

function Modal(props) {
  console.log(props.show);
  if(props.questionNumber === 0) {

  }
  // onClose = e => {
  //   this.props.onClose && this.props.onClose(e);
  // };
  function showQuestion() {
    API.easyAlgo().then(res=> {
      const number = props.questionNumber
      let answers, question, correct
      switch (number) {
        case 0:
          
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
      
        default:
          break;
      }
      // const answers = res.data.answers + question
      // console.log(answers)
      function dispatchQuestion() {

        store.dispatch({
          type: "ASK_QUESTION",
          payload: {
            answers: answers,
            question: `${question}`,
            correct: `${correct}`,
            // dialogue: `${res.data[0].dialogue}`,
            form: "mc",
          },
        })
        document.querySelector(".question").style.display = "block";
      }
    });
    console.log(store.getState().question.answers)
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
  } else if (props.questionNumber === 0){
    return (
      <div className={"modal"} id={"modal"} style={{ color: "Salmon" }}>
      <h3>{props.name} says:</h3>
      <h2>{props.dialogue}</h2>
      <button onClick={closeModal}>Close</button>
    </div>
    )
  }
  else {
    return (
      <div className={"modal"} id={"modal"} style={{ color: "Salmon" }}>
        <h3>{props.name} says:</h3>
        <h2>{props.dialogue}</h2>
        <button onClick={showQuestion}>Next</button>
        <Question/>
        <div className={"actions"}>
          {/* <button class="toggle-button" onClick={this.onClose}>
            close
          </button> */}
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

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   show: PropTypes.bool.isRequired
// };
