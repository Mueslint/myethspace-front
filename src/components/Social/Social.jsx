import React from 'react';
import { Flex, Column } from '../styled';
import Ethereum from './Ethereum';
import Github from './Github';
import Opensea from './OpenSea';

const Social = () => (
    <Column width="100%">
        <b>Social networks</b>
        <Flex>
            <Github />
            <Opensea />
            <Ethereum />
        </Flex>
    </Column>
)

export default Social