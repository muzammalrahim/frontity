import React from "react";
import { formatPostData } from "../helpers";
import SliderItem from "./slider-item";

const HomePopularSlider = ({ data, state, ...rest }) => {
  // const { title, excerpt, featured_media, link, categories, author, publishDate } = data;
    const postData = data;
  return (
      <div className="slide">
          {postData && postData.map(({type, id}, index) => {
              const item = state.source[type][id];
              if(item){
                  const postData = formatPostData(state, item);
                  return <SliderItem key={id} data={postData}/>;
              }
          })
          }
      </div>
  );
};

export default HomePopularSlider;
