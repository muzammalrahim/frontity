import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { PostImageWithOverlay } from "../featured-post/components";
import Link from "../link";
import PostCategories from "../post/post-categories";
import {decode} from "frontity";
import {formatDate} from "../helpers";

const PostPreview = ({ data, ...rest }) => {
  const { title, excerpt, featured_media, link, categories } = data;

  return (
    <Flex
      direction="row"
      position="relative"
      bg="white"
      as="article"
      shadow="md"
      {...rest}
    >
      {/* Use the frontity settings for featuredPost here */}
      {featured_media && featured_media.src && (
          <Flex p="40px" flexGrow="1" direction="column" position="relative" width="50%">
        <Link link={link}>
          <PostImageWithOverlay {...featured_media} />
        </Link>
          </Flex>
      )}

      <Flex p="40px" flexGrow="1" direction="column" width="50%">
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
          <Link link={link}>{title}</Link>
        </Heading>
        <Box
          my="20px"
          flex="1"
          color="gray.700"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <Link link={link} bg="#08f" p="10px" color="white">Read More</Link>
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
