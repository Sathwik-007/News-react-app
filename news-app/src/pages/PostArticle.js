import classes from "./PostArticle.module.css";
import NewsApp from "../abis/NewsApp.json";
import config from "../config.json";
import { ethers } from "ethers";
import { useState, useEffect, useRef } from "react";

import { Buffer } from "buffer";

import { BsCardImage } from "react-icons/bs";

import { create } from "ipfs-http-client";
import MessageModal from "../components/MessageModal";
import GreetingModal from "../components/GreetingModal";

const PostArticle = () => {
  const [newsApp, setNewsApp] = useState(null);
  const [provider, setProvider] = useState(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const categoryRef = useRef(null);
  const [image, setImage] = useState(null);

  const [overlay, setOverlay] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const disableOverlay = () => {
    setOverlay(false);
  };
  const enableOverlay = () => {
    setOverlay(true);
  };

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
    enableOverlay();
    <MessageModal onModalClick={disableOverlay} displayStakeMessage={true} />;
  }, []);
  const [messageTitle, setMessageTitle] = useState(false);
  const [messageContent, setMessageContent] = useState(false);
  const [emoteArray, setEmoteArray] = useState([]);

  const modalData = (title, content, emoteArray) => {
    enableOverlay();
    setMessageTitle(title);
    setMessageContent(content);
    setEmoteArray(emoteArray);
  };

  const postArticleHandler = async (event) => {
    event.preventDefault();
    const title = titleRef.current.value.trim();
    const content = contentRef.current.value.trim();
    const category = categoryRef.current.value.trim();

    if (title.length >= 170) {
      const modalTitle = "Title is too long!";
      const modalContent = 'Isn\'t this title way too long to be a "Title"?';
      const modalEmotes = ["&#x1F62C;"];
      modalData(modalTitle, modalContent, modalEmotes);
      titleRef.current.focus();
      return;
    } else if (title.length < 30) {
      const modalTitle = "Title is too short!";
      const modalContent = 'Isn\'t this title way too short to be a "Title"?';
      const modalEmotes = ["&#x1F62C;"];
      modalData(modalTitle, modalContent, modalEmotes);
      titleRef.current.focus();
      return;
    }
    if (
      category.toLowerCase() !== "technology" &&
      category.toLowerCase() !== "politics" &&
      category.toLowerCase() !== "finance" &&
      category.toLowerCase() !== "health" &&
      category.toLowerCase() !== "travel" &&
      category.toLowerCase() !== "world"
    ) {
      const modalTitle = "Invalid category";
      const modalContent = "Please choose a valid category.";
      const modalEmotes = ["&#x1F625;"];
      modalData(modalTitle, modalContent, modalEmotes);
      categoryRef.current.focus();
      return;
    }
    if (content.length <= 4) {
      const modalTitle = "Content too short!";
      const modalContent = "Isn't this content way too short for an article?";
      const modalEmotes = ["&#x1F636;&#x200D;&#x1F32B;&#xFE0F;"];
      modalData(modalTitle, modalContent, modalEmotes);
      contentRef.current.focus();
      return;
    }
    if (!image) {
      const modalTitle = "No image uploaded!";
      const modalContent =
        "Seems like no image reference has been uploaded. Please upload an image.";
      const modalEmotes = ["&#x1F636;&#x200D;&#x1F32B;&#xFE0F;"];
      modalData(modalTitle, modalContent, modalEmotes);
      return;
    } else {
      setLoading(true);
      const ipfsUrl = await saveToIpfs();

      const signer = await provider.getSigner();

      const vote = await newsApp
        .connect(signer)
        .postArticle(title, content, category, ipfsUrl, {
          value: tokens(0.099),
        });

      vote.wait();
      setLoading(false);
      enableOverlay();
      setPostSuccess(true);
    }
  };

  const imageHandler = (event) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const file = event.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
    } else {
      const modalTitle = "Unsupported file type";
      const modalContent =
        'Accepted file types are : ".jpg", ".png" and ".gif"';
      const modalEmotes = ["&#x1F636;&#x200D;&#x1F32B;&#xFE0F;"];
      modalData(modalTitle, modalContent, modalEmotes);
    }
  };

  const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
  const projectSecret = process.env.REACT_APP_INFURA_API_KEY;
  const subDomain = process.env.REACT_APP_INFURA_GATEWAY;

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
          <textarea type="text" placeholder="Add title..." ref={titleRef} />
        </div>
        <div className={classes.category}>
          <input type="text" placeholder="Category" ref={categoryRef} />
        </div>
        {/* image upload button */}
        <div className={classes.upload_image}>
          <label htmlFor="uploadImage">
            <BsCardImage />
            &nbsp;&nbsp;&nbsp;Upload image
          </label>
          <input
            id="uploadImage"
            type="file"
            accept="image/jpeg, image/png"
            onChange={imageHandler}
            style={{ display: "none" }}
          />
          <button
            type="button"
            style={{ display: "none" }}
            onClick={() => document.getElementById("uploadImage").click()}
          ></button>
          {image && <p>Selected file: {image.name}</p>}
        </div>
        {/* input for content */}
        <div className={classes.content}>
          <textarea type="text" placeholder="Description..." ref={contentRef} />
        </div>
        {/* post article button */}
        <button type="submit" className={classes.post_button}>
          {loading ? "Please Wait ..." : "Post"}
        </button>
        {overlay ? (
          <MessageModal
            onModalClick={disableOverlay}
            title={messageTitle}
            content={messageContent}
            emoteArray={emoteArray}
          />
        ) : undefined}
        {overlay && postSuccess ? (
          <GreetingModal onModalClick={disableOverlay} />
        ) : undefined}
      </div>
    </form>
  );
};

export default PostArticle;
