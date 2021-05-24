import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import {PostImage, PostImageWithOverlay} from "../featured-post/components";
import Link from "../link";
import { formatDate } from "../helpers";
import PostCategories from "../post/post-categories";
import Image from "@frontity/components/image";

const HomeCatPostPreview = ({ data, isFirst, ...rest }) => {
  const { title, excerpt, featured_media, link, categories, author, publishDate } = data;
// console.log('categories: ', categories);
  return (
      <li className="post-item tie-standard">

        {isFirst && <div className="big-thumb-left-box-inner"
             style={{backgroundImage: 'url('+featured_media.src+')'}}>

          <a aria-label={title}
             href={link} className="post-thumb"></a>

          <div className="post-overlay">
            <div className="post-content">

              <a className="post-cat tie-cat-1"
                 href="https://seniorresourcehub.com/category/health-insurance/medicare/">Medicare</a>
              <PostCategories justifyContent="flex-start" categories={categories} limit="1" />
              <h2 className="post-title"><a href={link}>{title}</a></h2>

              <div className="thumb-meta">
                <div className="post-meta clearfix"><span className="author-meta single-author no-avatars"><span
                    className="meta-item meta-author-wrapper meta-author-3"><span className="meta-author"><a
                    href={author.url} className="author-name tie-icon"
                    title={author.name}>{author.name}</a></span></span></span><span className="date meta-item tie-icon">{formatDate(publishDate)}</span>
                </div></div>
            </div>
          </div>
        </div>
        }
          {!isFirst &&<>
              <a aria-label={title}
                 href={link} className="post-thumb">
                  <Image sizes="(max-width: 1024px) 100vw, 1024px" src={featured_media.src} srcSet={featured_media.srcSet} className="attachment-jannah-image-small size-jannah-image-small tie-small-image wp-post-image" />
              </a>
              <div className="post-details">
                  <div className="post-meta clearfix">
                      <span className="date meta-item tie-icon">{formatDate(publishDate)}</span>
                  </div>
                  <h2 className="post-title">
                      <a href={link}>
                          {title}
                      </a>
                  </h2>
              </div>
              </>
          }
      </li>
  );
};

export default HomeCatPostPreview;
