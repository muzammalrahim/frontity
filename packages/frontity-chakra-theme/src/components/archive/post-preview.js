import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { PostImageWithOverlay } from "../featured-post/components";
import Link from "../link";
import { styled ,css} from "frontity";
import {decode} from "frontity";
import {formatDate} from "../helpers";
 import { useMediaQuery } from "@chakra-ui/react"
const PostPreview = ({ data, ...rest }) => {
  const { title, excerpt, featured_media, link} = data;
  
 const [isSmallerThan800] = useMediaQuery("(max-width: 800px)")
  
  return (
    <Flex
    position="relative"
    direction={isSmallerThan800 ? "column": "row"} 
      bg="white"
      box-shadow= "none"
      as="article"
      {...rest}
    >
   
      {featured_media && featured_media.src && (

        <Flex py="40px" pl="40px" pr="20px" flexGrow="1" direction="column" position="relative" width={isSmallerThan800 ?"100%":"50%"}>
        <Link link={link}>
          <PostImageWithOverlay {...featured_media} />
        </Link>
          </Flex> 
        
      )}

      <Flex py="40px" pl="10px" pr="0px"  flexGrow="1" direction="column" width={isSmallerThan800 ?"100%":"50%"} >
        <Flex direction="row" mb="5px">
          <Text fontSize="sm">
            <Link color="#767676" link={data.author.link}>
              {decode(data.author.name)}
            </Link>
          </Text>
          <Text fontSize="sm" color="#767676" ml="12px">
            {formatDate(data.publishDate)}
          </Text>
        </Flex>
     
       <Heading fontSize="20px" fontFamily="Poppins"  as="h4" textTransform="uppercase">  
       <StyledDiv>  <Link  link={link}>{title}</Link>   </StyledDiv>
      </Heading>
  
        
        <Box
          flex="1"
          fontSize="sm" 
          color= "#666666"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
  
          <Link link={link} bg="#08f"  width={{ md: "100px" }} mt="5px" py="8px"  fontSize="sm"  color="white" css={css` text-align: center ; border-radius: 4px;  &:hover {
            background-color: #036fcd;
         
          &:focus {
            background-color: #036fcd;
          }
        } `} > Read More </Link> 
        {/*<PostCategories
          color="black"
          justify="flex-start"
          categories={categories}
        />*/}
        <Text>
      </Text>
      </Flex>
    </Flex>
  );
};

export default PostPreview;


const StyledDiv = styled.div`
&:hover {
  color: #4ac2f5;
 
  &:focus {
    color: #4ac2f5;
  }
}
`;

const StyledDiv2 = styled.div`
display: grid;
grid-template-columns: 1fr ;
// same as:
// grid-template-columns: repeat(3, 1fr);
grid-gap: 8px

`;

