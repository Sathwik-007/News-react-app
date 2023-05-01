import classes from "./VotingModal.module.css";
import ReactDOM from "react-dom";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { ethers } from "ethers";
import NewsApp from "../abis/NewsApp.json";
import config from "../config.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const VotingModal = (props) => {
  const navigate = useNavigate();
  const [newsApp, setNewsApp] = useState(null);
  const [provider, setProvider] = useState(null);
  const [voteSuccess, setVoteSuccess] = useState(false);

  const init = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const network = await provider.getNetwork();

    const newsApp = new ethers.Contract(
      config[network.chainId].newsApp.address,
      NewsApp,
      provider
    );
    setProvider(provider);
    setNewsApp(newsApp);
  };

  useEffect(() => {
    init();
  }, []);

  const likeHandler = async () => {
    const articleId = props.articleId;
    // console.log("Article id:", articleId);

    const signer = await provider.getSigner();

    const vote = await newsApp
      .connect(signer)
      .vote(articleId, true, { value: tokens(0.001) });

    vote.wait();
    setVoteSuccess(true);
  };

  const dislikeHandler = async () => {
    const articleId = props.articleId;

    const signer = await provider.getSigner();

    const vote = await newsApp
      .connect(signer)
      .vote(articleId, false, { value: tokens(0.001) });

    vote.wait();
    setVoteSuccess(true);
    console.log("voted successfully");
  };

  const Backdrop = () => {
    return (
      <div onClick={props.onModalClick} className={classes.backdrop}></div>
    );
  };

  const Modal = () => {
    return (
      <div className={classes.modal}>
        {!voteSuccess && (
          <>
            <h1>
              Before you vote, please be aware that this process involves stake
              of <u>0.001 ETH</u>.
            </h1>
            <h5>
              We recommend that you only vote if you are confident in your
              knowledge of the article's content and you genuinely believe it is
              legitimate 🧑‍⚖️. Your vote has the potential to impact the
              credibility of the article and the platform as a whole. Thank you
              for taking the time to consider your vote carefully.
            </h5>
            <br />
            <button className={classes.like_button} onClick={likeHandler}>
              <AiFillLike />
              <br />
              <h4>upvote</h4>
              <br />
              <h6>{props.likes} people finds this true</h6>
            </button>
            <button className={classes.dislike_button} onClick={dislikeHandler}>
              <AiFillDislike />
              <br />
              <h4>downvote</h4>
              <br />
              <h6>{props.dislikes} people finds this false</h6>
            </button>
          </>
        )}
        {voteSuccess && (
          <div className={classes.thanks_message}>
            <h2>Thank you for voting</h2>
            <h4>You will be shortly redirected to home page.</h4>
            {/* <button>back to home</button> */}
            {setTimeout(() => {
              navigate("/");
            }, 4000)}
          </div>
        )}
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

export default VotingModal;
