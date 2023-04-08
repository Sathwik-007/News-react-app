import classes from "./Navbar.module.css";
import { SiDesignernews } from "react-icons/si";
import { useState } from "react";
import Web3Modal from "web3modal";
import { AiFillCaretDown } from "react-icons/ai";
import { MdOutlineCreate } from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";

import { ethers } from "ethers";
import MessageModal from "./MessageModal";

const Navbar = () => {
  const [address, setAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [hidePostArticle, setHidePostArticle] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const web3Modal = new Web3Modal({
    network: "goerli",
    cacheProvider: true,
  });
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const logoutHandler = () => {
    const disconnect = window.confirm(
      "Are you sure you want to disconnect your wallet?"
    );
    if (disconnect) {
      setWalletConnected(false);
      setAddress("");
      setHidePostArticle(false);
      setIsOpen(false);
      // web3Modal.clearCachedProvider();
    }
    setShowLogoutModal(true);
  };

  const hidePostArticleButton = () => {
    setHidePostArticle(true);
  };

  const [isOpen, setIsOpen] = useState(false);

  const setIsOpenHandler = () => {
    if (!isOpen) setIsOpen(true);
    else setIsOpen(false);
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
            {isOpen ? (
              <div className={classes.menu_dropdown}>
                <li>view staked articles</li>
                <li onClick={logoutHandler}>disconnect wallet</li>
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
        {showLogoutModal ? <MessageModal logoutWarning={true} title={"Disconnect wallet"} message={"Are you sure you want to disconnect your wallet?. You can reconnect if you change your mind tho"} /> : undefined}
      </div>
    </div>
  );
};

export default Navbar;
