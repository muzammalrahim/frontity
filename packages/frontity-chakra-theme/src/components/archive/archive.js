import { Box, SimpleGrid, Flex } from "@chakra-ui/react";
import { connect } from "frontity";
import React from "react";
import ArchiveHeader from "./archive-header";
import ArchiveItem from "./archive-item";
import HomepageArchive from "./homepage-archive";
import Sidebar from "./../sidebar";
import Pagination from "./pagination";
import { decode } from "frontity";
import { useMediaQuery } from "@chakra-ui/react"

const Archive = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  // console.log('data ',data);

  const [_isSmallerThan900] = useMediaQuery("(max-width: 900px)")

  if (data.isHome && state.router.link === '/') {
      return <HomepageArchive />;
  }

  return (
    <Box background="white" as="section" >
      {/* If the list is a taxonomy, we render a title. */}
      {/* {data.isTaxonomy && (
        <ArchiveHeader
          showPattern={state.theme.showBackgroundPattern}
          taxonomy={data.taxonomy}
          title={decode(state.source[data.taxonomy][data.id].name)}
        />
      )}*/}

  
     <h1>  Home/{decode(state.source[data.taxonomy][data.id].name)}</h1>

      {/* If the list is an author, we render a title. */}
      {data.isAuthor && (
        <ArchiveHeader
          showPattern={state.theme.showBackgroundPattern}
          taxonomy="Posts By"
          title={decode(state.source.author[data.id].name)}
        />
      )}
        <Flex p="40px"  flexGrow="1" direction={_isSmallerThan900 ?"column": "row"} >
      <Box
        padding={{ base: "24px", lg: "40px" }}
        bg="white"
        width={_isSmallerThan900 ?{ lg: "100%" } :{ lg: "75%" }}
        maxWidth="1200px"
        mx="auto"
       
      >
        {/* Iterate over the items of the list. */}
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing="40px">
          {data.items.map(({ type, id }) => {
            const item = state.source[type][id];
            // console.log('type id: '+id,type);
            return <ArchiveItem key={item.id} item={item} />;
          })}
        </SimpleGrid>
        <Pagination mt="56px" />
      </Box>
        <Box  
            width={_isSmallerThan900 ?{ lg: "100%" } :{ lg: "25%" }}
            padding={{ base: "24px", lg: "40px" }} 
            bg="white">
            <Sidebar/>
        </Box>
      </Flex>
    </Box>
  );
};

export default connect(Archive);
