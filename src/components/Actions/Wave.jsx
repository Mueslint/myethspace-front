import React from 'react';
import { ethers } from "ethers";

import {contractABI, contractAddress} from "../../utils/constants"
import { Flex, StyledSpan, StyledButton} from '../styled';

const Wave = ({totalWaves, setTotalWaves, setIsSelectingAction}) => {
    const wave = async () => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const myEthSpaceContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            let count = await myEthSpaceContract.getTotalSocialActions();

            const waveTxn = await myEthSpaceContract.wave("Hey Mueslint! Nice to meet ya ;)");
            console.log("Mining...", waveTxn.hash);
    
            await waveTxn.wait();
            console.log("Mined -- ", waveTxn.hash);
    
            count = await myEthSpaceContract.getTotalSocialActions();
            setTotalWaves(count.totalWaves.toNumber());
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error);
        }
      }

    return(
    <Flex>
        <StyledButton onClick={wave}>
            <span role="img" aria-label="wave button">👋</span>
        </StyledButton>
        <StyledSpan>{totalWaves}</StyledSpan>
    </Flex>
)}

export default Wave;