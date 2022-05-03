import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import abi from "./utils/MyEthSpace.json"
import "./App.css";
import {Bio, Social} from "./components/index.js";
import { Flex } from "./components/styled";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xC9b616d9bC2C425ff335dA08909cb95cEEE35425";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const myEthSpaceContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await myEthSpaceContract.getTotalSocialActions();
        console.log("Retrieved total wave count...", count.totalWaves.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        <h1>Hello there!</h1>
        </div>

        <div className="bio">
          <Bio />
          <Social />
        </div>

          <Flex>
            <button className="waveButton" onClick={wave}>
              <span role="img" aria-label="wave button">👋</span>
            </button>
            <button className="waveButton" onClick={wave}>
              <span role="img" aria-label="thumbs up button">👍</span>
            </button>
            <button className="waveButton" onClick={wave}>
              <span role="img" aria-label="like button">❤️</span>
            </button>
          </Flex>



        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App