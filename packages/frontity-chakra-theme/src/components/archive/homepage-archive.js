import { Box, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import { connect } from "frontity";
import {React, useEffect, useState, useRef} from "react";
import {FeaturedPostSection, SecondaryPostPreview} from "../featured-post/featured-post";
import { formatPostData, splitPosts, getPostCategories } from "../helpers";
import { Newsletter } from "../newsletter";
import HomeArchiveItem from "./home-archive-item";
import { PaginationButton } from "./pagination";
import HomeCatPostPreview from "./home-cat-post-preview";
import HomeResourcesPreview from "./home-resources-preview";
import HomePopularSlider from "../../components/sliders/home-popular-slider";
import Link from "../link";
import Slider from "react-slick";


const HomepageArchive = ({ actions, state, libraries }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  const allCats = state.source.get('all-categories');
  let slider = useRef(null);
  let mainslider = useRef(null);

  const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows:false,
      slidesToScroll: 1,
      slide: '.slide',
      className: 'tie-slick-slider',
  };

  const nextSlide = () =>  {
    slider.slickNext();
  }
  const previousSlide = () => {
    slider.slickPrev();
  }

  const nextMainSlide = () =>  {
    mainslider.slickNext();
  }
  const previousMainSlide = () => {
    mainslider.slickPrev();
  }

  const catIds = allCats.items.filter(cat => {
      if(cat.id !== 3){
          return cat.id;
      }
  }).map(function(obj) { return obj.id; });

  const [isFetching, setIsFetching] = useState(false);

  const [HasMore, setHasMore] = useState(true);
  const [whatsnewItems, setWhatsnewItems] = useState([]);
  const [sliderItems, setSliderItems] = useState([]);
  const [pageWhatsnew, setPageWhatsnew] = useState(1);
  let sliderPostItems = '';

  useEffect( async () => {
      await actions.source.fetch('/all-posts/'+catIds+'/'+pageWhatsnew);
      await actions.source.fetch('/slider-posts');

      sliderPostItems = state.source.get('/slider-posts');
      setSliderItems(sliderPostItems);
      loadWhatsNew();
  },[]);

  const [healthInsPosts, setHealthInsPosts] = useState([]);
  const [financePosts, setFinancePosts] = useState([]);
  const [seniorResPosts, setSeniorResPosts] = useState([]);
  const [covidPosts, setcovidPosts] = useState([]);

  const [pageCovid, setPageCovid] = useState(1);
  const [pageFinance, setPageFinance] = useState(1);
  const [pageHealthIns, setPageHealthIns] = useState(1);
  const [pageSeniorRes, setPageSeniorRes] = useState(1);

  let covidPostItems = '';
  let healthInsPostsItem = '';
  let financePostItems = '';
  let seniorResPostItems = '';
  useEffect(async () => {
      //fetch posts for these specific categories
      await actions.source.fetch('/cat/'+ allCats.items[0].id+'/'+pageCovid);
      await actions.source.fetch('/cat/'+ allCats.items[1].id+'/'+pageHealthIns);
      await actions.source.fetch('/cat/'+ allCats.items[2].id+'/'+pageFinance);
      await actions.source.fetch('/cat/'+ allCats.items[4].id+'/'+pageSeniorRes);

      //now get the above fetched routes
      covidPostItems = state.source.get('/cat/'+ allCats.items[0].id+'/'+pageCovid);
      healthInsPostsItem = state.source.get('/cat/'+ allCats.items[1].id+'/'+pageHealthIns);
      financePostItems = state.source.get('/cat/'+ allCats.items[2].id+'/'+pageFinance);
      seniorResPostItems = state.source.get('/cat/'+ allCats.items[4].id+'/'+pageSeniorRes);

      //update states for all the categories now
      setHealthInsPosts(healthInsPostsItem);
      setFinancePosts(financePostItems);
      setSeniorResPosts(seniorResPostItems);
      setcovidPosts(covidPostItems);
  }, [pageCovid, pageFinance,pageHealthIns,pageSeniorRes]);

  const [allResourcesPosts, setAllResourcesPosts] = useState([]);
  const [pageResources, setPageResources] = useState(1);
  let allResourcesPostItems = '';
  useEffect(() => {
    actions.source.fetch('/all-posts/'+catIds+'/'+pageResources);
    allResourcesPostItems = state.source.get('/all-posts/'+catIds+'/'+pageResources);

    setAllResourcesPosts(allResourcesPostItems);
  }, [pageResources]);


  function loadWhatsNew(){
      const whatsnewposts = state.source.get('/all-posts/'+catIds+'/'+pageWhatsnew);
        if(whatsnewposts && whatsnewposts.items && whatsnewposts.items.length > 0){
          setWhatsnewItems((whatsnewItems) => whatsnewItems.concat(whatsnewposts))
          if(pageWhatsnew < whatsnewposts.totalPages){
              setPageWhatsnew(pageWhatsnew+1);
          }
          setHasMore(whatsnewposts.items.length > 0);
      }
  }

  function healthInsPrev() {
      if(pageHealthIns > 1){
          setPageHealthIns(pageHealthIns-1);
      }
  }

  function healthInsNext ()  {
      if(pageHealthIns < healthInsPosts.totalPages){
          setPageHealthIns(pageHealthIns+1);
      }
  }

  function financePrev() {
      if(pageFinance > 1){
          setPageFinance(pageFinance-1);
      }
  }

  function financeNext ()  {
      if(pageFinance < financePosts.totalPages){
          setPageFinance(pageFinance+1);
      }
  }

  function seniorResPrev() {
      if(pageSeniorRes > 1){
          setPageSeniorRes(pageSeniorRes-1);
      }
  }

  function seniorResNext ()  {
      if(pageSeniorRes < seniorResPosts.totalPages){
          setPageSeniorRes(pageSeniorRes+1);
      }
  }

  function resourcesPrev() {
      if(pageResources > 1){
          setPageResources(pageResources-1);
      }
  }

  function resourcesNext ()  {
      if(pageResources < allResourcesPosts.totalPages){
          setPageResources(pageResources+1);
      }
  }

  function covidPrev() {
      if(pageCovid > 1){
          setPageCovid(pageCovid-1);
      }
  }

  function covidNext ()  {
      if(pageCovid < covidPosts.totalPages){
          setPageCovid(pageCovid+1);
      }
  }

  function whatsNewPrev() {
      if(pageWhatsnew > 1){
          setPageWhatsnew(pageWhatsnew-1);
      }
  }

  async function whatsNewNext ()  {
      /*if(pageWhatsnew < whatsNewPosts.totalPages){
          setPageWhatsnew(pageWhatsnew+1);
      }*/
      await actions.source.fetch('/all-posts/'+catIds+'/'+pageWhatsnew);
      loadWhatsNew();
  }

  const covidHeading = state.source['category'][allCats.items[0].id] ? state.source['category'][allCats.items[0].id].name:'';
  const healthInsHeading = state.source['category'][allCats.items[1].id] ? state.source['category'][allCats.items[1].id].name:'';
  const financeHeading = state.source['category'][allCats.items[2].id] ? state.source['category'][allCats.items[2].id].name:'';
  const seniorResHeading = state.source['category'][allCats.items[4].id] ? state.source['category'][allCats.items[4].id].name:'';

// console.log('data: ',catOneHeading);
  const [firstThreePosts, othersPosts] = splitPosts(state, data.items, 3);
  const [popularTopics, notRequiredTopics] = splitPosts(state, allResourcesPosts?allResourcesPosts.items : [], 4);
  const [popularSlidesPageOne, popularSlidesPageTwo] = splitPosts(state, popularTopics? popularTopics : [], 2);
  const [topSlidesPageOne, topSlidesPageTwo] = splitPosts(state, sliderItems? sliderItems.items : [], 5);
// console.log('popularTopics : ', popularTopics);
  return (
    <Box bg="white" as="section">
      {/*<FeaturedPostSection
        data={firstThreePosts.map(post => formatPostData(state, post))}
      />*/}
      <Box
            /*py={{ base: "64px", md: "80px" }}
            px={{ base: "24px", md: "40px" }}*/
            width={{ base: "auto"}}
            maxWidth="1200px"
            mx="auto"
            className="section-item is-first-section full-width"
        >
          <div className="container">
                  <div className="tie-row main-content-row">
                      <div className="main-content tie-col-md-12">
                          <div id="tie-block_1354"
                              className="slider-area mag-box">
                              <div className="slider-area-inner">
                                  <div id="tie-main-slider-14-block_1354"
                                           className="tie-main-slider main-slider grid-5-first-big grid-5-slider boxed-slider grid-slider-wrapper tie-slick-slider-wrapper">
                                          <div className="main-slider-inner">
                                              <ul className="tie-slider-nav">
                                                  <li className="slick-arrow">
                                                      <span className="tie-icon-angle-left" onClick={previousMainSlide} />
                                                  </li>
                                                  <li className="slick-arrow">
                                                      <span className="tie-icon-angle-right" onClick={nextMainSlide} />
                                                  </li>
                                              </ul>
                                              <Slider ref={c => (mainslider = c)} {...settings}>
                                                  {topSlidesPageOne && (
                                                      <HomePopularSlider state={state} data={topSlidesPageOne} />
                                                  )}
                                                  {topSlidesPageTwo && (
                                                      <HomePopularSlider state={state} data={topSlidesPageTwo} />
                                                  )}
                                                  {/*{popularTopics && popularTopics.map(({type, id}, index) => {
                                                      const item = state.source[type][id];
                                                      if(item){
                                                          const postData = formatPostData(state, item);
                                                          return <HomePopularSlider key={id} data={postData}/>;
                                                      }
                                                  })}*/}
                                              </Slider>
                                          </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
          </div>
      </Box>
          <Box
              /*py={{ base: "64px", md: "80px" }}
            px={{ base: "24px", md: "40px" }}*/
            width={{ base: "auto"}}
            maxWidth="1200px"
            mx="auto"
            className="section-item sidebar-right has-sidebar"
          >
              <div className="container-normal" style={{height: 'auto !important'}}>
                  <div className="tie-row main-content-row">
                      <div className="main-content tie-col-md-8 tie-col-xs-12">
                          {healthInsPosts &&
                          <div id="tie-block_3151"
                              className="mag-box big-post-left-box big-thumb-left-box first-post-gradient has-custom-color">
                              <div className="container-wrapper">
                                  <div className="mag-box-title the-global-title">
                                      {healthInsHeading && <h3>
                                          {healthInsHeading}
                                      </h3>
                                      }
                                      <div className="tie-alignright">
                                          <div className="mag-box-options">
                                              <ul className="slider-arrow-nav">
                                                  <li>
                                                      <Link onClick={() => healthInsPrev()} className={pageHealthIns === 1?"block-pagination prev-posts pagination-disabled":"block-pagination prev-posts"}>
                                                          <span className="tie-icon-angle-left"></span>
                                                          <span className="screen-reader-text">Previous page</span>
                                                      </Link>

                                                      {/*<a className={pageHealthIns === 1?"block-pagination prev-posts pagination-disabled":"block-pagination prev-posts"}
                                                          onClick={() => healthInsPrev()}>
                                                          <span className="tie-icon-angle-left"></span>
                                                          <span className="screen-reader-text">Previous page</span>
                                                      </a>*/}
                                                  </li>
                                                  <li>
                                                      <a className={pageHealthIns === healthInsPosts.totalPages?"block-pagination next-posts pagination-disabled" : "block-pagination next-posts"} onClick={() => healthInsNext()}>
                                                          <span className="tie-icon-angle-right"></span>
                                                          <span className="screen-reader-text">Next page</span>
                                                      </a>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="mag-box-container clearfix">
                                      <ul className="posts-items posts-list-container posts-items-3">
                                          {healthInsPosts && healthInsPosts.items && healthInsPosts.items.map(({type, id}, index) => {
                                              const item = state.source[type][id];
                                              const postData = formatPostData(state, item);
                                              //console.log('pstData ', postData);
                                              if (index == 0 && healthInsPosts.items.length > 0) {
                                                  return <HomeCatPostPreview key={id} data={postData} isFirst={true}/>
                                              } else {
                                                  return <HomeCatPostPreview key={id} data={postData}/>;
                                              }
                                              // return <HomeArchiveItem key={item.id} item={item} />;
                                          })}
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          }

                          {financePosts &&
                          <div id="tie-block_1160"
                              className="mag-box big-post-top-box has-first-big-post box-dark-skin dark-skin has-custom-color">
                              <div className="container-wrapper">
                                  <div className="mag-box-title the-global-title">
                                      {financeHeading && <h3>
                                          {financeHeading}
                                      </h3>
                                      }
                                      <div className="tie-alignright">
                                          <div className="mag-box-options">
                                              <ul className="slider-arrow-nav">
                                                  <li>
                                                      <a className={pageFinance === 1?"block-pagination prev-posts pagination-disabled":"block-pagination prev-posts"}
                                                          onClick={() => financePrev()}>
                                                          <span className="tie-icon-angle-left"></span>
                                                          <span className="screen-reader-text">Previous page</span>
                                                      </a>
                                                  </li>
                                                  <li>
                                                      <a className={pageFinance === financePosts.totalPages?"block-pagination next-posts pagination-disabled" : "block-pagination next-posts"} onClick={() => financeNext()}>
                                                          <span className="tie-icon-angle-right"></span>
                                                          <span className="screen-reader-text">Next page</span>
                                                      </a>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="mag-box-container clearfix">
                                      <ul className="posts-items posts-list-container">
                                          {financePosts && financePosts.items && financePosts.items.map(({type, id}, index) => {
                                              const item = state.source[type][id];
                                              const postData = formatPostData(state, item);
                                              //console.log('pstData ', postData);
                                              /*if (index == 0 && financePosts.items.length > 0) {
                                                  return <HomeCatPostPreview data={postData} isFirst={true}/>
                                              } else {*/
                                                  return <HomeCatPostPreview key={id} data={postData}/>;
                                              // }
                                              // return <HomeArchiveItem key={item.id} item={item} />;
                                          })}
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          }

                          {seniorResPosts &&
                          <div id="tie-block_1810"
                              className="mag-box tie-col-sm-6 half-box has-first-big-post has-custom-color first-half-box">
                              <div className="container-wrapper">
                                  <div className="mag-box-title the-global-title">
                                      {seniorResHeading && <h3>
                                          {seniorResHeading}
                                      </h3>
                                      }
                                      <div className="tie-alignright">
                                          <div className="mag-box-options">
                                              <ul className="slider-arrow-nav">
                                                  <li>
                                                      <a className={pageSeniorRes === 1?"block-pagination prev-posts pagination-disabled":"block-pagination prev-posts"}
                                                          onClick={() => seniorResPrev()}>
                                                          <span className="tie-icon-angle-left"></span>
                                                          <span className="screen-reader-text">Previous page</span>
                                                      </a>
                                                  </li>
                                                  <li>
                                                      <a className={pageSeniorRes === seniorResPosts.totalPages?"block-pagination next-posts pagination-disabled" : "block-pagination next-posts"} onClick={() => seniorResNext()}>
                                                          <span className="tie-icon-angle-right"></span>
                                                          <span className="screen-reader-text">Next page</span>
                                                      </a>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="mag-box-container clearfix">
                                      <ul className="posts-items posts-list-container">
                                          {seniorResPosts && seniorResPosts.items && seniorResPosts.items.map(({type, id}, index) => {
                                              const item = state.source[type][id];
                                              const postData = formatPostData(state, item);
                                              //console.log('pstData ', postData);
                                              /*if (index == 0 && seniorResPosts.items.length > 0) {
                                                  return <HomeCatPostPreview data={postData} isFirst={true}/>
                                              } else {*/
                                                  return <HomeCatPostPreview key={id} data={postData}/>;
                                              // }
                                              // return <HomeArchiveItem key={item.id} item={item} />;
                                          })}
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          }
                      </div>
                      <aside className="sidebar tie-col-md-4 tie-col-xs-12 normal-side is-sticky is-alreay-loaded is-fixed" style={{position: "relative", overflow: "visible", boxSizing: "border-box", minHeight: "2110px", height: "auto !important"}}>

                      </aside>
                  </div>
              </div>
          </Box>
        <Box
            /*py={{ base: "64px", md: "80px" }}
            px={{ base: "24px", md: "40px" }}*/
            width={{ base: "auto"}}
            maxWidth="1200px"
            mx="auto"
            className="section-item full-width"
        >
            <div className="container" style={{height: 'auto !important'}}>
                  <div className="tie-row main-content-row">
                      <div className="main-content tie-col-md-12">
                          {popularTopics &&
                          <div id="tie-block_3032"
                              className="slider-area mag-box media-overlay">

                                  <div className="mag-box-title the-global-title">
                                      {popularTopics && <h3>
                                          Popular Topics
                                      </h3>
                                      }
                                  </div>
                                  <div className="slider-area-inner">
                                      <div id="tie-main-slider-9-block_3032"
                                           className="tie-main-slider main-slider grid-2-big boxed-slider grid-slider-wrapper tie-slick-slider-wrapper">
                                          <div className="main-slider-inner">
                                              <ul className="tie-slider-nav">
                                                  <li className="slick-arrow">
                                                      <span className="tie-icon-angle-left" onClick={previousSlide} />
                                                  </li>
                                                  <li className="slick-arrow">
                                                      <span className="tie-icon-angle-right" onClick={nextSlide} />
                                                  </li>
                                              </ul>
                                              <Slider ref={c => (slider = c)} {...settings}>
                                                  {popularSlidesPageOne && (
                                                      <HomePopularSlider state={state} data={popularSlidesPageOne} />
                                                  )}
                                                  {popularSlidesPageTwo && (
                                                      <HomePopularSlider state={state} data={popularSlidesPageTwo} />
                                                  )}
                                                  {/*{popularTopics && popularTopics.map(({type, id}, index) => {
                                                      const item = state.source[type][id];
                                                      if(item){
                                                          const postData = formatPostData(state, item);
                                                          return <HomePopularSlider key={id} data={postData}/>;
                                                      }
                                                  })}*/}
                                              </Slider>
                                          </div>
                                      </div>
                                  </div>
                          </div>
                          }
                      </div>
                  </div>
            </div>
        </Box>
        <Box
            /*py={{ base: "64px", md: "80px" }}
            px={{ base: "24px", md: "40px" }}*/
            width={{ base: "auto"}}
            maxWidth="1200px"
            mx="auto"
            className="section-item sidebar-right has-sidebar"
        >
            <div className="container-normal" style={{height: 'auto !important'}}>
                  <div className="tie-row main-content-row">
                      <div className="main-content tie-col-md-8 tie-col-xs-12">
                          {allResourcesPosts &&
                          <div id="tie-block_1837"
                              className="mag-box miscellaneous-box first-post-gradient has-first-big-post media-overlay has-custom-color">
                              <div className="container-wrapper">
                                  <div className="mag-box-title the-global-title">
                                      {allResourcesPosts && <h3>
                                          Our Resources
                                      </h3>
                                      }
                                      <div className="tie-alignright">
                                          <div className="mag-box-options">
                                              <ul className="slider-arrow-nav">
                                                  <li>
                                                      <a className={pageResources === 1?"block-pagination prev-posts pagination-disabled":"block-pagination prev-posts"}
                                                          onClick={() => resourcesPrev()}>
                                                          <span className="tie-icon-angle-left"></span>
                                                          <span className="screen-reader-text">Previous page</span>
                                                      </a>
                                                  </li>
                                                  <li>
                                                      <a className={pageResources === allResourcesPosts.totalPages?"block-pagination next-posts pagination-disabled" : "block-pagination next-posts"} onClick={() => resourcesNext()}>
                                                          <span className="tie-icon-angle-right"></span>
                                                          <span className="screen-reader-text">Next page</span>
                                                      </a>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="mag-box-container clearfix">
                                      <ul className="posts-items posts-list-container">
                                          {allResourcesPosts && allResourcesPosts.items && allResourcesPosts.items.map(({type, id}, index) => {
                                              const item = state.source[type][id];
                                              if(item){
                                                  const postData = formatPostData(state, item);
                                                  if (index == 0 && allResourcesPosts.items.length > 0) {
                                                      return <HomeResourcesPreview key={id} data={postData} isFirst={true}/>
                                                  } else {
                                                      return <HomeResourcesPreview key={id} data={postData}/>;
                                                  }
                                              }
                                          })}
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          }

                          {covidPosts &&
                          <div id="tie-block_611"
                              className="mag-box big-post-left-box has-first-big-post has-custom-color">
                              <div className="container-wrapper">
                                  <div className="mag-box-title the-global-title">
                                      {covidHeading && <h3>
                                          {covidHeading}
                                      </h3>
                                      }
                                      <div className="tie-alignright">
                                          <div className="mag-box-options">
                                              <ul className="slider-arrow-nav">
                                                  <li>
                                                      <a className={pageCovid === 1?"block-pagination prev-posts pagination-disabled":"block-pagination prev-posts"}
                                                          onClick={() => covidPrev()}>
                                                          <span className="tie-icon-angle-left"></span>
                                                          <span className="screen-reader-text">Previous page</span>
                                                      </a>
                                                  </li>
                                                  <li>
                                                      <a className={pageCovid === covidPosts.totalPages?"block-pagination next-posts pagination-disabled" : "block-pagination next-posts"} onClick={() => covidNext()}>
                                                          <span className="tie-icon-angle-right"></span>
                                                          <span className="screen-reader-text">Next page</span>
                                                      </a>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="mag-box-container clearfix">
                                      <ul className="posts-items posts-list-container posts-items-3">
                                          {covidPosts && covidPosts.items && covidPosts.items.map(({type, id}, index) => {
                                              const item = state.source[type][id];
                                              const postData = formatPostData(state, item);
                                              //console.log('pstData ', postData);
                                              return <HomeCatPostPreview key={id} data={postData}/>;
                                              // return <HomeArchiveItem key={item.id} item={item} />;
                                          })}
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          }

                          {whatsnewItems &&
                          <div id="tie-s_1441"
                              className="mag-box big-posts-box has-custom-color">
                              <div className="container-wrapper">
                                  <div className="mag-box-title the-global-title">
                                      <h3>
                                          What's New
                                      </h3>
                                      <div className="tie-alignright">
                                          <div className="mag-box-options">
                                              <ul className="slider-arrow-nav">
                                                  <li>
                                                      <a className={pageWhatsnew === 1?"block-pagination prev-posts pagination-disabled":"block-pagination prev-posts"}
                                                          onClick={() => whatsNewPrev()}>
                                                          <span className="tie-icon-angle-left"></span>
                                                          <span className="screen-reader-text">Previous page</span>
                                                      </a>
                                                  </li>
                                                  <li>
                                                      <a className={pageWhatsnew === whatsnewItems.totalPages?"block-pagination next-posts pagination-disabled" : "block-pagination next-posts"} onClick={() => whatsNewNext()}>
                                                          <span className="tie-icon-angle-right"></span>
                                                          <span className="screen-reader-text">Next page</span>
                                                      </a>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="mag-box-container clearfix">

                                      {
                                          whatsnewItems && whatsnewItems.map((items, index) => {
                                              return (
                                                  <>
                                                      <ul className="posts-items posts-list-container posts-items-3">
                                                      {items && items.items && items.items.map(({type, id}, index) => {
                                                          const item = state.source[type][id];
                                                          const postData = formatPostData(state, item);
                                                         return (
                                                             <>
                                                                <HomeCatPostPreview key={id} data={postData}/>
                                                             </>
                                                         )
                                                      })}
                                                      </ul>
                                                      <div className="clearfix"></div>
                                                  </>
                                                )
                                          })
                                      }

                                      {/*<ul className="posts-items posts-list-container posts-items-3">
                                          {console.log('new',whatsnewItems)}
                                          {whatsnewItems && whatsnewItems.items && whatsnewItems.items.map(({type, id}, index) => {
                                              const item = state.source[type][id];
                                              const postData = formatPostData(state, item);
                                              return <HomeCatPostPreview data={postData}/>;
                                          })}
                                      </ul>
                                      <div className="clearfix"></div>*/}
                                  </div>
                                  {setHasMore && <a className="block-pagination next-posts show-more-button load-more-button"
                                     data-text="Load More" onClick={() => whatsNewNext()}>Load More</a>
                                  }
                              </div>
                          </div>
                          }

                      </div>
                  </div>
            </div>
        </Box>
      {libraries.newsletter && (
        <Newsletter showPattern={state.theme.showBackgroundPattern} />
      )}
    </Box>
  );
};

export default connect(HomepageArchive);

/*const getCatPosts = async (allCats, libraries, state, setData) => {
    const catPosts = await state.source.get(allCats.items[1].link);
    await setData({
        isReady: true,
        items: catPosts.items
    });
};*/
