import React from 'react';
import styled from 'styled-components';

import { Flex, StyledSpan } from '../styled';

const StyledInfo = styled(Flex)`
    justify-content: space-beetwen;
`;

const Messages = ({allMessages}) => {
  const lastMessage = allMessages.pop();

  if(lastMessage){
    return(
      <Flex>
        <StyledSpan style={{ backgroundColor: "OldLace", margin: "5px", padding: "8px" }}>
          <StyledInfo>
              <span><img alt="ethereum" src="ethereum.png" width="10"/>{' '}{lastMessage.address.substring(0,6)}...{lastMessage.address.substring(38)} - {lastMessage.timestamp.toDateString()}</span>
          </StyledInfo>
          <b>{lastMessage.message}</b>
        </StyledSpan>
      </Flex>
    )   
  } else return null;
}

export default Messages;