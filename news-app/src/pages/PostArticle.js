import classes from "./PostArticle.module.css";
import NewsApp from "../abis/NewsApp.json";
import config from "../config.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostArticle = () => {
  const navigate = useNavigate();
  const [newsApp, setNewsApp] = useState(null);
  const [provider, setProvider] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether");
  };

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

  
  const captureTitleHandler = (event) => {
    const title = event.target.value;
    setTitle(title);

  };

  const captureContentHandler = (event) => {
    const content = event.target.value;
    setContent(content);

  };
  
  const postArticleHandler = async (event) => {
    event.preventDefault();
    console.log("postarticlehandler")
    if (title.length >= 3 && content.length >= 10) {
      const signer = await provider.getSigner();

      const vote = await newsApp
        .connect(signer)
        .postArticle(title, content, { value: tokens(0.099) });

      vote.wait();
    }
    navigate("/");
  };

  return (
    <form onSubmit={postArticleHandler} className={classes.container}>
      <div className={classes.main_container}>
        {/* input for title */}
        <div className={classes.title}>
          <textarea
            onChange={captureTitleHandler}
            type="text"
            placeholder="Add title..."
          />
        </div>
        {/* input for content */}
        <div className={classes.content}>
          <textarea
            onChange={captureContentHandler}
            type="text"
            placeholder="Description..."
          />
        </div>
        {/* image upload button */}

        {/* post article button */}
        <button type="submit" className={classes.post_button}>
          Post
        </button>
      </div>
    </form>
  );
};

export default PostArticle;
