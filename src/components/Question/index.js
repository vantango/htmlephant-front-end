import React from "react";
import { connect } from "react-redux";
import ChoiceForm from "../Forms/ChoiceForm"
import InputForm from "../Forms/InputForm"
import Editor from "../Forms/CodeEditor"


function Question(props) {
  console.log(props.form)
  switch (props.form) {
    case "dialogue":
      return (
        <div className={"question"}>
          <h3>{props.name} says:</h3>
          <h2>{props.dialogue}</h2>
        </div>
      );
    case "mc":
      return (
        <div className={"question"}>
          <h2>{props.question}</h2>
          <ChoiceForm />
        </div>
      );
    case "input":
      return (
        <div className={"question"}>
          <h2>{props.question}</h2>
          <InputForm />
        </div>
      );
      case "editor":
      return (
        <div className={"question"}>
          <h2>{props.question}</h2>
          <Editor />
        </div>
      );
    default:
      return (
        <div className={"question"}>
          <h1>No question found.</h1>
        </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    ...state.question,
  };
}

export default connect(mapStateToProps)(Question);
