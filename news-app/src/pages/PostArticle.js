import classes from "./PostArticle.module.css";
import NewsApp from "../abis/NewsApp.json";
import config from "../config.json";
import { ethers } from "ethers";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

import { create } from "ipfs-http-client";

const PostArticle = () => {
  const navigate = useNavigate();
  const [newsApp, setNewsApp] = useState(null);
  const [provider, setProvider] = useState(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const categoryRef = useRef(null);
  const [image, setImage] = useState(null);

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

  const postArticleHandler = async (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const category = categoryRef.current.value;
    if (
      title.trim().length >= 3 &&
      content.trim().length >= 10 &&
      category.trim().length >= 4
    ) {
      /** Create a modal, that accepts tags and then when pressed ok,
       * @method postArticle().
       */

      const ipfsUrl = await saveToIpfs();

      const signer = await provider.getSigner();

      const vote = await newsApp
        .connect(signer)
        .postArticle(title, content, category, ipfsUrl, {
          value: tokens(0.099),
        });

      vote.wait();
    }
    navigate("/");
  };
  const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
  const projectSecret = process.env.REACT_APP_INFURA_API_KEY;
  const subDomain = process.env.REACT_APP_INFURA_GATEWAY;

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const saveToIpfs = async () => {
    const auth =
      "Basic " +
      Buffer.from(projectId + ":" + projectSecret).toString("base64");

    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: { authorization: auth },
    });
    const file = image;
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const fileUrl = `${subDomain}/ipfs/${added.path}`;
      console.log(added, "----", added.path);
      console.log("ipfs url :", fileUrl);
      return fileUrl;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    return "";
  };

  return (
    <form onSubmit={postArticleHandler} className={classes.container}>
      <div className={classes.main_container}>
        {/* input for title */}
        <div className={classes.title}>
          <textarea
            // onChange={captureTitleHandler}
            type="text"
            placeholder="Add title..."
            ref={titleRef}
          />
        </div>
        <div className={classes.title}>
          <textarea type="text" placeholder="Category" ref={categoryRef} />
        </div>
        {/* image upload button */}
        <div className={classes.upload_image}>
          <label for="uploadImage">Add Image : </label>
          <input
            id="uploadImage"
            type="file"
            accept="image/jpeg, image/png"
            onChange={imageHandler}
          />
        </div>
        {/* input for content */}
        <div className={classes.content}>
          <textarea
            // onChange={captureContentHandler}
            type="text"
            placeholder="Description..."
            ref={contentRef}
          />
        </div>
        {/* post article button */}
        <button type="submit" className={classes.post_button}>
          Post
        </button>
      </div>
    </form>
  );
};

export default PostArticle;
