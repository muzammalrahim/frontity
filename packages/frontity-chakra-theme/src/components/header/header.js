import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Link from "../link";
import MobileMenu from "../menu";
import TopNav from "./topnav"
import { isUrl, omitConnectProps } from "../helpers";
import { connect } from "frontity";

const SiteHeader = props => (
  <Box
    as="header"
    transition="transform ease .25s"
    width="100%"
    pos="relative"
    top="0"
    left="0"
    boxShadow="0 0 10px 5px rgb(0 0 0 / 10%)"
    zIndex="90"
    {...props}
  />
);

const SiteHeaderInner = props => (
  <Flex
    align="center"
    width={{ base: "auto", sm: "92%" }}
    mx="auto"
    bg="#1f2024"
    height={{ sm: "70px" }}
    maxW="1550px"
    {...props}
  />
);

const SiteLogoContainer = props => (
  <Flex
    align="center"
    width={{ base: "auto", sm: "92%" }}
    mx="auto"
    height={{ sm: "300px" }}
    maxW="1550px"
    {...props}
  />
);

const Logo = ({ isImage = true, src }) =>
  isImage ? (
    <Box as="img" src={src} width="120px"  max-height= "123px" width= "auto" />
  ) : (
      <Box
        fontSize="2xl"
        color="white"
        fontFamily="heading"
        textTransform="uppercase"
        fontWeight="bold"
      >
        {src}
      </Box>
    );

const SiteLogo = connect(({ state, ...props }) => {
  // check if the logo is a url,
  // we assume, if it's a url, it points to an image, else it's a text
  const isImage = isUrl(state.theme.logo);
  return (
    <Box display="block" flexShrink="0" {...omitConnectProps(props)}>
      <Link link="/">
        <Logo isImage={isImage} src={state.theme.logo} />
      </Link>
    </Box>
  );
});

const Header = ({ children, ...props }) => (
  <SiteHeader {...props}>
      <TopNav />
      <SiteLogoContainer>
          <SiteLogo />
      </SiteLogoContainer>
    <SiteHeaderInner>
      <MobileMenu />
      {children}
    </SiteHeaderInner>
  </SiteHeader>
);

export default Header;
