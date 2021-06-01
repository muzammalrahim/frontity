import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Link from "../link";
import { decode } from "frontity";

export const PostCategory = props => (
  <Box
    transition="background-color ease 0.25s"
    px="5px"
    border="2px solid"
    // borderColor="accent.400"
    borderColor="#08f"
    fontSize= "12px"
    // fontFamily="heading"
    textTransform="uppercase"
    fontWeight="medium"
    display="inline-block"
    padding=" 0 6px"
    color="#fff"
    borderRadius="3px"
    transition="0.3s"
    bg="#08f"
    _hover={{
      bg: "#036fcd",
      color: props.color
    }}
    {...props}
  />
);

export const PostCategories = ({
  categories,
  limit = 3,
  color = "white",
  ...props
}) => {
  const limitCategories =
    categories.length > limit
      ? categories.filter((_, idx) => idx < limit)
      : categories;

  return (
    <Flex flexWrap="wrap" mt="12px" {...props}>
      {limitCategories.map(category => (
        <PostCategory color={color} key={category.id} mr="6px" mb="6px">
          <Link
            link={category.link}
            dangerouslySetInnerHTML={{ __html: decode(category.name) }}
          />
        </PostCategory>
      ))}
    </Flex>
  );
};

export default PostCategories;
