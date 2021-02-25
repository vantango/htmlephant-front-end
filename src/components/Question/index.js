import React from "react";
import { connect } from "react-redux";



function Question(props) {
  
    return (
      <div className= {"question"}>
          <h1>{props.question}</h1>
      </div>
    );
}

function mapStateToProps(state) {
  return {
    ...state.question,
  };
}

export default connect(mapStateToProps)(Question);
