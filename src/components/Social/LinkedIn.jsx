import React from 'react';
import styled from 'styled-components';

const StyledAnchor = styled.a`
  margin: 0.5rem;  
`;

const LinkedIn = () => (
    <>
        <StyledAnchor href="https://www.linkedin.com/in/emmanuel-solom/" target="_blank" rel="noreferrer">
        <span>
          <img alt="LinkedIn" src="linkedin.png" width="30"/>
        </span>
        </StyledAnchor>
    </>
)

export default LinkedIn;