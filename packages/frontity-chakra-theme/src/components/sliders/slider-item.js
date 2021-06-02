import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import {PostImage, PostImageWithOverlay} from "../featured-post/components";
import Link from "../link";
import { timeDiff } from "../helpers";
import PostCategories from "../post/post-categories";
import Image from "@frontity/components/image";
import {decode} from "frontity";

const SliderItem = ({ data, ...rest }) => {
  const { title, excerpt, featured_media, link, categories, author, publishDate } = data;
  return (
          <div
              style={{backgroundImage: "url("+featured_media.src+")"}}
              className="grid-item slide-id-1418 tie-slide-1 tie-standard">
              <Link aria-label={excerpt} link={link} className="all-over-thumb-link" />
              <div className="thumb-overlay">
                  <span className="tie-icon tie-media-icon" />
                  <span className="post-cat-wrap">
                      <Link link={categories[0].link} className="post-cat" dangerouslySetInnerHTML={{ __html: decode(categories[0].name)}} />
                  </span>
                  <div className="thumb-content">
                      <div className="thumb-meta">
                          <span className="date meta-item tie-icon">{timeDiff(publishDate)}</span>
                      </div>
                      <h2 className="thumb-title">
                          <Link link={link} dangerouslySetInnerHTML={{ __html: title}}  />
                      </h2>
                      <div className="thumb-desc"  dangerouslySetInnerHTML={{ __html: excerpt && excerpt.length > 80 ? excerpt.slice(0,80)+'...' : excerpt}} />
                  </div>
              </div>
          </div>
  );
};

export default SliderItem;
