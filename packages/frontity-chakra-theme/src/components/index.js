import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { connect, Head, Global, css } from "frontity";
import Switch from "@frontity/components/switch";
import React from "react";
import Archive from "./archive";
import Footer from "./footer";
import Header from "./header";
import Loading from "./loading";
import Page404 from "./page404";
import Post from "./post/post";
import SearchResults from "./search";
import Title from "./title";
import FontFace from "./styles/font-face";
import mainTheme from "./styles/wp-site/style.min.css";
import baseTheme from "./styles/wp-site/base.min.css";
import widgetCSS from "./styles/wp-site/widgets.min.css";
import helperCSS from "./styles/wp-site/helpers.min.css";

// Theme is the root React component of our theme. The one we will export
// in roots.
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  const overrides = extendTheme({
    fonts: {
      heading: "Kelson, system-ui, Helvetica, sans-serif"
    },
    colors: { ...state.theme.colors }
  });

  return (
    <ChakraProvider theme={{ ...overrides }}>
        <Global styles={css(mainTheme)} />
        <Global styles={css(baseTheme)} />
      <Global styles={css(widgetCSS)} />
      <Global styles={css(helperCSS)} />
      <FontFace />
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add the header of the site. */}
      <Header />

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Box
        as="main"
        mt={{ base: "40px", md: "70px" }}
        minH="calc(100vh - 320px)"
        className="block-head-1 magazine2" 
        bg="#ffffff"
      >
        <Switch>
          <Loading when={data.isFetching} />
          <SearchResults when={data.isSearch} />
          <Archive when={data.isArchive} />
          <Post when={data.isPostType} />
          <Page404 when={data.is404} />
        </Switch>
      </Box>

      <Footer />
    </ChakraProvider>
  );
};

export default connect(Theme);
