import styled from 'styled-components';

export const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledAnchor = styled.a`
  margin: 0.5rem;  
`;

export const StyledSpan = styled.span`
    max-width: 100%;
    padding: 0.5rem;
    border-radius: 12px;
    border: none;
    box-shadow: rgb(0 0 0 / 8%) 0px 12px 30px -10px;
    background-color: rgb(255, 255, 255);
    text-align: center;
    color: gray;
`

export const ActionBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    padding: 0.2rem;
    margin: 2rem auto;
    border-radius: 12px;
    border: none;
    box-shadow: rgb(0 0 0 / 8%) 0px 12px 30px -10px;
    background-color: rgb(255, 255, 255);
    text-align: center;
    color: gray;
`

export const BioContainer = styled.div`
  max-width: 100%;
  padding: 1.5rem;
  margin: 2rem auto;
  border-radius: 12px;
  border: none;
  box-shadow: rgb(0 0 0 / 8%) 0px 12px 30px -10px;
  background-color: rgb(255, 255, 255);
  text-align: center;
  color: gray;
`

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 64px;
`
  
export const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
`
  
export const Header = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: white;
`

export const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 32px;
`

export const ConnectWallet = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 12px;
    border: none;
    box-shadow: rgb(0 0 0 / 8%) 0px 12px 30px -10px;
    background-color: #white;
    text-align: center;
    color: gray;
    cursor: pointer;
    font-size: 32px;
`