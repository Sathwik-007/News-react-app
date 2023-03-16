import classes from "./MainContent.module.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const MainContent = (props) => {
  const articles = props.articles;

  return (
    <>
      {articles.map((article) => {
        const key = uuidv4();
        console.log(key);
        return (
          // <Link to={key}>
            <div className={classes.card} key={key}>
              <img src={article.urlToImage} alt="" />
              <h5>{article.title}</h5>
              <span className={classes.author}>{article.author}</span>
              <p className={classes.timestamp}>
                {article.publishedAt.replace(/[a-zA-Z]/, " ")}
              </p>
            </div>
          // </Link>
        );
      })}
    </>
  );
};

export default MainContent;
