import classes from "./GreetingModal.module.css";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const GreetingModal = (props) => {
  const navigate = useNavigate();
  const Backdrop = () => {
    return (
      <div
        onClick={props.onModalClick}
        className={classes.greeting_backdrop}
      ></div>
    );
  };

  const Modal = () => {
    return (
      <div className={classes.greeting_modal}>
        <h1>
          Hurray!! Article successfully posted 😄.
        </h1>
          <h5>
            🎉 Congratulations! 🙌 Thank you for choosing our platform to share
            your article. We're thrilled to have you here! 💪 Keep up the great
            work, and we can't wait to see more of your content.
          </h5>
        <button
          className={classes.congrats_button}
          onClick={() => navigate("/")}
        >
          Go back to home
        </button>
      </div>
    );
  };
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-div")
      )}
      {ReactDOM.createPortal(
        <Modal />,
        document.getElementById("modal-overlay")
      )}
    </>
  );
};

export default GreetingModal;
