import { Box, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import { connect } from "frontity";
import {React, useEffect, useState} from "react";
import {FeaturedPostSection, SecondaryPostPreview} from "../featured-post/featured-post";
import { formatPostData, splitPosts, getCategoryPosts, getPostCategories } from "../helpers";
import { Newsletter } from "../newsletter";
import HomeArchiveItem from "./home-archive-item";
import { PaginationButton } from "./pagination";
import HomeCatPostPreview from "./home-cat-post-preview";

const HomepageArchive = ({ actions, state, libraries }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  const allCats = state.source.get('all-categories');
  const [dataCat, setData] = useState({
    isReady: false,
    items: []
  });
  const [pageHealthIns, setPageHealthIns] = useState(1);
  const [pageFinance, setPageFinance] = useState(1);
  const [pageSeniorRes, setPageSeniorRes] = useState(1);

  useEffect(() => {
    actions.source.fetch('/cat/'+ allCats.items[1].id+'/'+pageHealthIns);
    actions.source.fetch('/cat/'+ allCats.items[2].id+'/'+pageFinance);
    actions.source.fetch('/cat/'+ allCats.items[4].id+'/'+pageSeniorRes);
  }, [pageFinance,pageHealthIns,pageSeniorRes]);

  // 2. get data from frontity state
  const healthInsPosts = state.source.get('/cat/'+ allCats.items[1].id+'/'+pageHealthIns);
  const financePosts = state.source.get('/cat/'+ allCats.items[2].id+'/'+pageFinance);
  const seniorResPosts = state.source.get('/cat/'+ allCats.items[4].id+'/'+pageSeniorRes);

  // console.log('allCats', allCats);

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

  const healthInsHeading = state.source['category'][allCats.items[1].id] ? state.source['category'][allCats.items[1].id].name:'';
  const financeHeading = state.source['category'][allCats.items[2].id] ? state.source['category'][allCats.items[2].id].name:'';
  const seniorResHeading = state.source['category'][allCats.items[4].id] ? state.source['category'][allCats.items[4].id].name:'';

// console.log('data: ',catOneHeading);
  const [firstThreePosts, othersPosts] = splitPosts(state, data.items);

  return (
    <Box bg="white" as="section">
      <FeaturedPostSection
        data={firstThreePosts.map(post => formatPostData(state, post))}
      />
      <Button
          onClick={()=>setPage(2)}
      >
          CLick me!
      </Button>
      <Box
        py={{ base: "64px", md: "80px" }}
        px={{ base: "24px", md: "40px" }}
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
                                                  <a className={pageHealthIns === 1?"block-pagination prev-posts pagination-disabled":"block-pagination prev-posts"}
                                                      onClick={() => healthInsPrev()}>
                                                      <span className="tie-icon-angle-left"></span>
                                                      <span className="screen-reader-text">Previous page</span>
                                                  </a>
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
                                              return <HomeCatPostPreview data={postData} isFirst={true}/>
                                          } else {
                                              return <HomeCatPostPreview data={postData}/>;
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
                                              return <HomeCatPostPreview data={postData}/>;
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
                                              return <HomeCatPostPreview data={postData}/>;
                                          // }
                                          // return <HomeArchiveItem key={item.id} item={item} />;
                                      })}
                                  </ul>
                              </div>
                          </div>
                      </div>
                      }
                  </div>
              </div>
          </div>

        {/*<SimpleGrid
          mt={{ base: "64px", md: "80px" }}
          columns={{ base: 1, md: 2 }}
          spacing="40px"
        >
          {catPosts && catPosts.items && catPosts.items.map(({ type, id }) => {
            const item = state.source[type][id];
            const postData = formatPostData(state, item);
            // return <HomeArchiveItem key={item.id} item={item} />;
              return <SecondaryPostPreview data={postData} />;
          })}
        </SimpleGrid>*/}

        {/*<PaginationButton mt="40px" link={data.next}>
          More posts
        </PaginationButton>*/}
      </Box>
      {libraries.newsletter && (
        <Newsletter showPattern={state.theme.showBackgroundPattern} />
      )}
    </Box>
  );
};

export default connect(HomepageArchive);

const getCatPosts = async (allCats, libraries, state, setData) => {
    const catPosts = await state.source.get(allCats.items[1].link);
    await setData({
        isReady: true,
        items: catPosts.items
    });
};
