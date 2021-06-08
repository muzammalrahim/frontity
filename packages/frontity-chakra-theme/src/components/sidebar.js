import React from "react";
import { connect, styled } from "frontity";
import { Heading, Box } from "@chakra-ui/react";
import SidebarItem from "./sidebar-item";

const Sidebar = ({ state, pathname, id }) => {
    const data = state.source['sidebar'][id];
    // const data = state.source.get('/sidebar/'+pathname+'/'+id+'');
     // console.log('datase', data);
    // console.log('pathname:', pathname)
    return (
        <Box>
            <Heading fontSize="2xl" as="h4" textTransform="uppercase">
        
            </Heading>
             <SidebarItem  html={data?.html} />
        </Box>
    );
}

export default connect(Sidebar);

