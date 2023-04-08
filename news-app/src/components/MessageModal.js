import ReactDOM from "react-dom";
import classes from "./MessageModal.module.css";

const MessageModal = (props) => {
  const Backdrop = () => {
    return (
      <div
        onClick={props.onModalClick}
        className={classes.message_backdrop}
      ></div>
    );
  };

  const Modal = () => {
    return (
      <>
        {props.displayStakeMessage ? (
          <div className={classes.message_modal}>
            <h1 className={classes.emphasize}>
              Note
              <span
                className={classes.repair_emote}
                dangerouslySetInnerHTML={{
                  __html: "❗️",
                }}
              />
            </h1>
            <h4>
              Current stake required for posting an article is{" "}
              <span className={classes.emphasize_price}>0.99 ether</span>.
            </h4>
            <h5>
              Final stake may vary with including{" "}
              <span className={classes.emphasize_price}> gas fee</span>.
            </h5>
          </div>
        ) : (
          <div className={classes.message_modal}>
            <h1>{props.title}</h1>
            <span
              className={classes.emotes}
              dangerouslySetInnerHTML={{
                __html: props.emoteArray[0],
              }}
            />
            <h5>{props.content}</h5>
            <button className={classes.fix_button} onClick={props.onModalClick}>
              Fix it!
              <span
                className={classes.repair_emote}
                dangerouslySetInnerHTML={{
                  __html: "&#x1f6e0;&#xfe0f;",
                }}
              />
            </button>
          </div>
        )}
      </>
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

export default MessageModal;
