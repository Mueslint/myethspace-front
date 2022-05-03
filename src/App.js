import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import {contractABI, contractAddress} from "./utils/constants"
import {Bio, Social, Wave} from "./components/index.js";
import { ActionBar, BioContainer, StyledButton, DataContainer, Header, MainContainer } from "./components/styled";

import Thumb from "./components/Actions/Thumbs";
import Like from "./components/Actions/Like";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalWaves, setTotalWaves] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalThumbs, setTotalThumbs] = useState(0);

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
  }, [])

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

        <ActionBar>
          <Wave totalWaves={totalWaves} setTotalWaves={setTotalWaves} />
          <Thumb totalThumbs={totalThumbs} setTotalThumbs={setTotalThumbs} />
          <Like totalLikes={totalLikes} setTotalLikes={setTotalLikes} />
        </ActionBar>

        {!currentAccount && (
          <StyledButton className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </StyledButton>
        )}
      </DataContainer>
    </MainContainer>  
  );
}

export default App