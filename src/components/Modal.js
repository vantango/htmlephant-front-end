import './modal.css';

const Modal = ({question }) => {
  // const showHideClassName = show ? "modal display-block" : "modal display-none";

  const handleClose = () => {
    document.querySelector(".modal-main").setAttribute("style", "display:none")
  } 

  const onSubmit = () => {
    if(!document.querySelector("#answer").value(2)){
      return "Please try again"
    } else{
      return "good job!"
    }
  }

  question= [1,2,3]
  return (
    
    <div>
      <section className="modal-main" style={{display:"none"}} >
        <h1>What is 1+1?</h1>
        <form>
        <input type="text" id="answer" name="answer"></input>
        <input type="submit" value="Submit"></input>
        </form>
        {/* <div>{question[1]}</div> */}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

// export default Modal


