import { Box, color, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { PostImageWithOverlay } from "../featured-post/components";
import Link from "../link";
import PostCategories from "../post/post-categories";
import { styled ,css} from "frontity";
import {decode} from "frontity";
import {formatDate} from "../helpers";
const PostPreview = ({ data, ...rest }) => {
  const { title, excerpt, featured_media, link, categories } = data;
  return (
    <Flex
      direction="row"
      position="relative"
      bg="white"
      box-shadow= "none"
      as="article"
      shadow="md"
      {...rest}
    >
      {/* Use the frontity settings for featuredPost here */}
      {featured_media && featured_media.src && (
          <Flex py="40px" pl="40px" pr="20px" flexGrow="1" direction="column" position="relative" width="50%">
        <Link link={link}>
          <PostImageWithOverlay {...featured_media} />
        </Link>
          </Flex>
      )}

      <Flex p="40px"  pl="0px" flexGrow="1" direction="column" width="50%">
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
     
       <Heading fontSize="2xl" as="h4" textTransform="uppercase">  
       <StyledDiv>  <Link  link={link}>{title}</Link>   </StyledDiv>
      </Heading>
  
        
        <Box
          flex="1"
          fontSize="sm" 
          color= "#666666"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
  
          <Link link={link} bg="#08f"  width={{ md: "150px" }} mt="5px" py="8px"  color="white" css={css` text-align: center ; border-radius: 4px;  &:hover {
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
