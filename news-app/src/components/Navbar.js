import classes from "./Navbar.module.css";
import { SiDesignernews } from "react-icons/si";
import { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { AiFillCaretDown } from "react-icons/ai";
import { MdOutlineCreate } from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [address, setAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  const web3Modal = new Web3Modal({
    network: "goerli",
    cacheProvider: false,
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
      web3Modal.clearCachedProvider();
    }
  };

  const renderButton = () => {
    if (walletConnected) {
      return (
        <div className={classes.wallet_connect_success}>
          <button className={classes.connect_wallet}>
            <Link to="post-article">
              Post an article <MdOutlineCreate />
            </Link>
          </button>
          <button className={classes.wallet_connected} onClick={logoutHandler}>
            <p className={classes.user_address}>
              {address.slice(0, 8)}... <AiFillCaretDown />
            </p>
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
      </div>
    </div>
  );
};

export default Navbar;
