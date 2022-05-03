import React from 'react';
import { Flex, Column } from '../styled';
import Ethereum from './Ethereum';
import Github from './Github';
import LinkedIn from './LinkedIn';
import Opensea from './OpenSea';

const Social = () => (
    <Column width="100%">
        <b>Social networks</b>
        <Flex>
            <Github />
            <LinkedIn />
            <Opensea />
            <Ethereum />
        </Flex>
    </Column>
)

export default Social