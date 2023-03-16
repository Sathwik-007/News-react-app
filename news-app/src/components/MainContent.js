import classes from "./MainContent.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import NewsApp from "../abis/NewsApp.json";
import config from "../config.json";

import { ethers } from "ethers";

const MainContent = () => {
  const [articles, setArticles] = useState(null);

  const init = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const network = await provider.getNetwork();

    const newsApp = new ethers.Contract(
      config[network.chainId].newsApp.address,
      NewsApp,
      provider
    );

    const totalArticles = await newsApp.totalArticles();

    const articles = [];

    for (var i = 1; i <= totalArticles; i++) {
      let article = await newsApp.getArticle(i);
      articles.push(article);
    }
    setArticles(articles);
    // console.log(articles);

    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {articles ? (
        articles.map((article) => (
          <div className={classes.card} key={article.articleId}>
            <Link to={`articles/${article.articleId}`}>
              <h5>{article.title}</h5>
              <span className={classes.author}>{article.author}</span>
              <p className={classes.timestamp}>
                {new Date(article.timestamp * 1000).toLocaleDateString()}
              </p>
            </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default MainContent;
