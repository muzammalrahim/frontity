import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { SocialMenu } from "./header/social-menu";
import { connect } from "frontity";
import Link from "./link";

const FooterSection = props => (
  <Box
    as="footer"
    pos="relative"
    bg="primary.900"
    py={{ base: "32px", lg: "40px" }}
    {...props}
  />
);

const FooterSectionGroup = props => (
  <SimpleGrid
    columns={{ base: 1, md: 1 }}
    maxWidth="1150px"
    mx="auto"
    width="90%"
    {...props}
  />
);

const FooterSectionItem = props => (
  <Box padding="10px" color="white" textAlign="center" {...props} />
);

const Footer = ({ state }) => (
  <FooterSection alignSelf="flex-end">
    <FooterSectionGroup>
      <FooterSectionItem>
        Copyright © {new Date().getFullYear()} , All Rights Reserved  |  <Link link={state.source.url}>Senior Resource Hub</Link>
      </FooterSectionItem>

      <FooterSectionItem>
        Content that imparts knowledge, because knowledge is power!
      </FooterSectionItem>

      <FooterSectionItem borderColor="accent.400">
        <SocialMenu
          ml="0"
          justifyContent="center"
          menu={state.theme.socialLinks}
        />
      </FooterSectionItem>
    </FooterSectionGroup>
  </FooterSection>
);

export default connect(Footer);
