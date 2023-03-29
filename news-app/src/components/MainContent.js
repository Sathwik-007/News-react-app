import classes from "./MainContent.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import NewsApp from "../abis/NewsApp.json";
import config from "../config.json";

import { ethers } from "ethers";
import Loading from "./Loading";

const MainContent = (props) => {
  const [articles, setArticles] = useState(null);
  const [account, setAccount] = useState(null);
  const selectedCategory = props.selectedCategory;

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

    for (var i = totalArticles; i > 0; --i) {
      let article = await newsApp.getArticle(i);
      articles.push(article);
    }
    setArticles(articles);
    props.articles(articles);
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {articles ? (
        articles
          .filter(
            (article) =>
              selectedCategory === "" ||
              selectedCategory === "All" ||
              article.category === selectedCategory
          )
          .map((article) => (
            <div className={classes.card} key={article.articleId}>
              <Link to={`articles/${article.articleId}`}>
                <img
                  className={classes.image}
                  src={article.image}
                  alt={`${article.articleId}`}
                />
                <h5>{article.title}</h5>
                <p className={classes.author}>
                  <u>Author:</u> {article.author.slice(0, 25)}...
                </p>
                <span className={classes.timestamp}>
                  {new Date(article.timestamp * 1000).toDateString()}
                  &nbsp;&nbsp;
                  {new Date(article.timestamp * 1000).toLocaleTimeString()}
                </span>
              </Link>
            </div>
          ))
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MainContent;
