import React from "react";
import { connect } from "react-redux";
import Question from "../Question"
// import "./style.css"

// import PropTypes from "prop-types";

function Modal(props) {
  console.log(props.show);

  // onClose = e => {
  //   this.props.onClose && this.props.onClose(e);
  // };
  if (!props.show) {
    return null;
  } else {
    return (
      <div className={"modal"} id={"modal"} style={{ color: "Salmon" }}>
        <h2>Modal Window</h2>
        <Question />
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
