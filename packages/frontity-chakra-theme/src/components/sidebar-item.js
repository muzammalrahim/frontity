import { Heading, Text, Box, Flex } from "@chakra-ui/react";
import React from "react";

const SidebarItem = ({ html , ...props }) => (
    <Flex>
          <Box
          my="20px"
          flex="1"
          color="gray.700"
          dangerouslySetInnerHTML={{ __html: html }}
        />
    </Flex>
);

export default SidebarItem;
