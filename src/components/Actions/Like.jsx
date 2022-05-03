import React from 'react';
import { ethers } from "ethers";

import {contractABI, contractAddress} from "../../utils/constants"
import { Flex, StyledSpan, StyledButton} from '../styled';

const Like = ({totalLikes, setTotalLikes}) => {
    const like = async () => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const myEthSpaceContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            let count = await myEthSpaceContract.getTotalSocialActions();

            const waveTxn = await myEthSpaceContract.like();
            console.log("Mining...", waveTxn.hash);
    
            await waveTxn.wait();
            console.log("Mined -- ", waveTxn.hash);
    
            count = await myEthSpaceContract.getTotalSocialActions();
            setTotalLikes(count.totalLikes.toNumber());
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error);
        }
      }

    return(
    <Flex>
        <StyledButton onClick={like}>
            <span role="img" aria-label="like button">❤️</span>
        </StyledButton>
        <StyledSpan>{totalLikes}</StyledSpan>
    </Flex>
)}

export default Like;