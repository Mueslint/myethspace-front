import React, { useEffect, useCallback, useState } from "react";
import { ethers } from "ethers";

import {contractABI, contractAddress} from "./utils/constants"
import {Bio, Messages, Social, Wave} from "./components/index.js";
import { ActionBar, BioContainer, DataContainer, Header, MainContainer, ConnectWallet } from "./components/styled";

import Thumb from "./components/Actions/Thumbs";
import Like from "./components/Actions/Like";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalWaves, setTotalWaves] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalThumbs, setTotalThumbs] = useState(0);
  const [allMessages, setAllMessages] = useState([]);

  const getSocialActions = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const myEthSpaceContract = new ethers.Contract(contractAddress, contractABI, signer);

        let socialActions = await myEthSpaceContract.getTotalSocialActions();
        
        setTotalWaves(socialActions.totalWaves.toNumber());
        setTotalThumbs(socialActions.totalThumbs.toNumber());
        setTotalLikes(socialActions.totalLikes.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllMessages = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const myEthSpaceContract = new ethers.Contract(contractAddress, contractABI, signer);

        const messages = await myEthSpaceContract.getAllMessages();

        let messagesCleaned = [];
        messages.forEach(message => {
          messagesCleaned.push({
            address: message.user,
            timestamp: new Date(message.timestamp * 1000),
            message: message.message
          });
        });

        /*
         * Store our data in React State
         */
        setAllMessages(messagesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = useCallback(async () => {
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
        getAllMessages();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }, [])
  
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

  useEffect(() => {
    checkIfWalletIsConnected();
    getSocialActions();
    getAllMessages();
  }, [checkIfWalletIsConnected])

  return (
    <MainContainer>
      <DataContainer>
        <Header>
          <h1>Hello there!</h1>
        </Header>

        <BioContainer>
          <Bio />
          <Social />
        </BioContainer>

        {currentAccount && (
          <>
            <ActionBar>
              <Wave totalWaves={totalWaves} setTotalWaves={setTotalWaves} />
              <Thumb totalThumbs={totalThumbs} setTotalThumbs={setTotalThumbs} />
              <Like totalLikes={totalLikes} setTotalLikes={setTotalLikes} />
            </ActionBar>
            <Messages allMessages={allMessages}/>
          </>
        )}

        {!currentAccount && (
          <ConnectWallet onClick={connectWallet}>
            <img alt="metamask" src="metamask.png" width="60"/> Connect Wallet
          </ConnectWallet>
        )}
      </DataContainer>
    </MainContainer>  
  );
}

export default App