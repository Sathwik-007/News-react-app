import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsApp from "../abis/NewsApp.json";
import config from "../config.json";
import classes from "./ArticleDetails.module.css";
import VotingModal from "../components/VotingModal";

const ArticleDetails = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  const getArticle = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const network = await provider.getNetwork();

    const CN_DAPP_CONTRACT = new ethers.Contract(
      config[network.chainId].newsApp.address,
      NewsApp,
      provider
    );

    /**
     * @param CN_DAPP_CONTRACT
     * use this param to call necessary method on the contract.
     */
    const article = await CN_DAPP_CONTRACT.getArticle(articleId);
    setArticle(article);
  };

  useEffect(() => {
    getArticle();
  }, []);

  const [showOverlay, setShowOverlay] = useState(false);

  const onModalClickDisable = () => {
    setShowOverlay(false);
  };

  const onModalClickEnable = () => {
    setShowOverlay(true);
  };

  return (
    <>
      {article ? (
        <div className={classes.container}>
          <p className={classes.title}>{article.title}</p>
          <p className={classes.author}>
            <b>Author</b>: {article.author}
          </p>
          {/* <p>likes:{article.likes.toString()}</p> */}
          {/* <p>dislikes:{article.dislikes.toString()}</p> */}
          <p className={classes.timestamp}>
            {new Date(article.timestamp * 1000).toDateString()}
          </p>
          <p className={classes.content}>{article.content}</p>
          <hr />
          <button onClick={onModalClickEnable}>Vote for legitimacy?</button>
          {showOverlay && (
            <VotingModal
              articleId={article.articleId}
              likes={article.likes.toString()}
              dislikes={article.dislikes.toString()}
              onModalClick={onModalClickDisable}
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ArticleDetails;
