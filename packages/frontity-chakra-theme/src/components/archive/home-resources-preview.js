import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import {PostImage, PostImageWithOverlay} from "../featured-post/components";
import Link from "../link";
import { timeDiff } from "../helpers";
import PostCategories from "../post/post-categories";
import Image from "@frontity/components/image";

const HomeResourcesPreview = ({ data, isFirst, ...rest }) => {
  const { title, excerpt, featured_media, link, categories, author, publishDate } = data;
// console.log('categories: ', categories);
  return (
      <li className="post-item tie-standard">

        {isFirst &&<>
            <Link link={link} className="post-thumb">
                  <Image sizes="(max-width: 1024px) 100vw, 1024px" src={featured_media.src} srcSet={featured_media.srcSet} className="attachment-jannah-image-small size-jannah-image-small tie-small-image wp-post-image" />
              </Link>
          {/*<a aria-label={title}
             href={link} className="post-thumb">
              <Image sizes="(max-width: 1024px) 100vw, 1024px" src={featured_media.src} srcSet={featured_media.srcSet} className="attachment-jannah-image-post size-jannah-image-post wp-post-image"></Image>
          </a>*/}
            <div className="clearfix"></div>

          <div className="post-overlay">
            <div className="post-content">

              {/*<a className="post-cat tie-cat-1"
                 href="https://seniorresourcehub.com/category/health-insurance/medicare/">Medicare</a>*/}
              <PostCategories justifyContent="flex-start" categories={categories} limit="1" />
              <h2 className="post-title">
                  <Link link={link} dangerouslySetInnerHTML={{ __html: title}}  />
                  {/*<a href={link}>{title}</a>*/}
              </h2>

              <div className="thumb-meta">
                <div className="post-meta clearfix">
                    <span className="author-meta single-author no-avatars">
                        <span className="meta-item meta-author-wrapper meta-author-3">
                            <span className="meta-author">
                                <Link link={author?.url} className="author-name tie-icon" dangerouslySetInnerHTML={{ __html: author?.name }} />
                                {/*<a href={author.url} className="author-name tie-icon" title={author.name} >
                                    {author.name}
                                </a>*/}
                            </span>
                        </span>
                    </span>
                    <span className="date meta-item tie-icon">{timeDiff(publishDate)}</span>
                </div>
              </div>
            </div>
          </div>
          </>
        }
          {!isFirst &&<>
              <Link link={link} className="post-thumb">
                  <Image sizes="(max-width: 1024px) 100vw, 1024px" src={featured_media.src} srcSet={featured_media.srcSet} className="attachment-jannah-image-small size-jannah-image-small tie-small-image wp-post-image" />
              </Link>
              <div className="post-overlay">
                <div className="post-content">
                    <div className="post-meta clearfix">
                      <span className="date meta-item tie-icon">{timeDiff(publishDate)}</span>
                    </div>
                    <h2 className="post-title">
                      <Link link={link} dangerouslySetInnerHTML={{ __html: title}}  />
                      {/*<a href={link}>
                          {title}
                      </a>*/}
                    </h2>
                </div>
              </div>
              </>
          }
      </li>
  );
};

export default HomeResourcesPreview;
