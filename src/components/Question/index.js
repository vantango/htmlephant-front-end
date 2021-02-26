import React from "react";
import { connect } from "react-redux";
import ChoiceForm from "../Forms/ChoiceForm"
import InputForm from "../Forms/InputForm"


function Question(props) {
  if(props.type==="mc"){
    return (
      <div className= {"question"}>
          <h3>{props.name} says:</h3>
          <h2>{props.question}</h2>
          <ChoiceForm />
      </div>
    );
    } else if (props.type==="input"){
        return (
            <div className= {"question"}>
                <h3>{props.name} says:</h3>
                <h2>{props.question}</h2>
                <InputForm />
            </div>
        );
    }
    else {
        return(
        <h1>No question found.</h1>
        )
    }
}

function mapStateToProps(state) {
  return {
    ...state.question,
  };
}

export default connect(mapStateToProps)(Question);
