import React from "react";
import { connect, styled } from "frontity";
import { Heading } from "@chakra-ui/react";

const Sidebar = ({ state }) => (
  <Heading fontSize="2xl" as="h4" textTransform="uppercase">
          Sidebar
  </Heading>
);

export default connect(Sidebar);
