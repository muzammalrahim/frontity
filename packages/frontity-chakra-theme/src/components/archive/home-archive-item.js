import { connect } from "frontity";
import React from "react";
import { formatPostData } from "../helpers";
import HomePostPreview from "./home-post-preview";

const HomeArchiveItem = ({ state, item }) => {
  const data = formatPostData(state, item);
  return <HomePostPreview data={data} />;
};

export default connect(HomeArchiveItem);
