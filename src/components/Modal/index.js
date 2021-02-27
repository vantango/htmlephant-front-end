import React from "react";
import { connect } from "react-redux";
import Question from "../Question";
import "./style.css"
import API from "../../utils/API"
import store from "../../config/store"
// import PropTypes from "prop-types";

function Modal(props) {
  console.log(props.show);

  // onClose = e => {
  //   this.props.onClose && this.props.onClose(e);
  // };
  function showQuestion() {
    API.easyAlgo().then(res=> {
      const answers = res.data.answers1
      console.log(answers)
      store.dispatch({
        type: "ASK_QUESTION",
        payload: {
          answers: answers,
          question: `${res.data.question1}`,
          correct: `${res.data.correctAnswer1}`,
          // dialogue: `${res.data[0].dialogue}`,
         form: "mc",
        },
      })
      document.querySelector(".question").style.display = "block";
    });
    console.log(store.getState().question.answers)
  }
  if (!props.show) {
    return null;
  } else {
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
