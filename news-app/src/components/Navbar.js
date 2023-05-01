import classes from "./Navbar.module.css";
import { SiDesignernews } from "react-icons/si";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { MdOutlineCreate } from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";

// import NewsApp from "../abis/NewsApp.json";
// import config from "../config.json";

import { ethers } from "ethers";
import MessageModal from "./MessageModal";

const Navbar = () => {
  const [address, setAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [hidePostArticle, setHidePostArticle] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // const web3Modal = new Web3Modal({
  //   network: "goerli",
  //   cacheProvider: true,
  // });
  const connectWallet = async () => {
    try {
      // const provider = await web3Modal.connect();
      // const ethersProvider = new ethers.providers.Web3Provider(provider);
      // const signer = ethersProvider.getSigner();
      // const userAddress = await signer.getAddress();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // const network = await provider.getNetwork();

      const signer = await provider.getSigner();

      // const vote = await newsApp.connect(signer).postArtcile

      // const newsApp = new ethers.Contract(
      //   config[network.chainId].newsApp.address,
      //   NewsApp,
      //   provider
      // );
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmLogoutHandler = () => {
    setShowLogoutModal(true);
  };

  const logoutHandler = () => {
    setOptionsAreOpen(false);
    setWalletConnected(false);
    setAddress("");
    setHidePostArticle(false);
    setShowLogoutModal(false);
  };

  const hidePostArticleButton = () => {
    setHidePostArticle(true);
  };

  const [OptionsAreOpen, setOptionsAreOpen] = useState(false);

  const setIsOpenHandler = () => {
    if (!OptionsAreOpen) setOptionsAreOpen(true);
    else setOptionsAreOpen(false);
  };
  const renderButton = () => {
    if (walletConnected) {
      return (
        <div className={classes.wallet_connect_success}>
          {!hidePostArticle && (
            <button
              onClick={hidePostArticleButton}
              className={classes.connect_wallet}
            >
              <Link to="create-article">
                Post an article <MdOutlineCreate />
              </Link>
            </button>
          )}
          <button className={classes.wallet_connected}>
            <p className={classes.user_address} onClick={setIsOpenHandler}>
              {address.slice(0, 8)}... <AiFillCaretDown />
            </p>
            {OptionsAreOpen ? (
              <div className={classes.menu_dropdown}>
                <li>view staked articles</li>
                <li onClick={confirmLogoutHandler}>disconnect wallet</li>
              </div>
            ) : undefined}
          </button>
        </div>
      );
    } else {
      return (
        <button className={classes.connect_wallet} onClick={connectWallet}>
          Connect your wallet <BiLink />
        </button>
      );
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <SiDesignernews />
        {renderButton()}
        {showLogoutModal ? (
          <MessageModal
            displayStakeMessage={false}
            onModalClick={() => {
              setShowLogoutModal(false);
              setOptionsAreOpen(false);
            }}
            logoutWarning={true}
            title={"Disconnect wallet"}
            content={
              "Are you sure you want to disconnect your wallet?. You can reconnect if you change your mind tho 👍"
            }
            logout={logoutHandler}
          />
        ) : undefined}
      </div>
    </div>
  );
};

export default Navbar;
