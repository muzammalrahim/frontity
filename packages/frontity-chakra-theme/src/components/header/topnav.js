import { Box, Flex, Text } from "@chakra-ui/react";
import { FaRegClock } from 'react-icons/fa';
import React from "react";



const TopNavBar = props => (
  <Box
    as="nav"
    width="100%"
    pos="relative"
    lineHeight="35px"
    border="1px solid rgba(0,0,0,0.1)"
    borderWidth="1px 0"
    color="#2c2f34"
    zIndex="10"
    {...props}
  />
);

const TobNavBarInner = props => (
    <Flex
        mx="auto"
        maxW="1550px"
        {...props}
    />
);

const TopNav = ({ ...props }) => (
    <TopNavBar {...props}>
        <TobNavBarInner>
            <Box fontSize="12px" as="div" d="flex" alignItems="center"><FaRegClock />   {new Date().toDateString()}</Box>
            <Box as="div" ml="10px" bg="#f05555" color="white" p="0 10px" fontSize="12px">Breaking News</Box>
        </TobNavBarInner>
    </TopNavBar>
);

export default TopNav;