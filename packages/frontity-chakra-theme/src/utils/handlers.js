export const sidebar = {
  name: "sidebar",
  priority: 8,
  pattern: "/sidebar/primary-widget-area",
  func: async ({ route, params, state, libraries }) => {
    // 1. get all sidebars
    const sidebarList = await libraries.source.api.get({
      endpoint: "sidebar/primary-widget-area"
    });
    //console.log('sidebarList: ', sidebarList);

    // 2. add everything to the state.
    const items = await libraries.source.populate({
      response: sidebarList,
      state
    });

    // console.log('siderbar: ', items);

    // 3. add info to data
    Object.assign(state.source.data[route], {
      id: 1,
      items: items
    });
  }
};

export const allCategoriesHandler = {
  name: "allCategories",
  priority: 10,
  pattern: "all-categories",
  func: async ({ route, params, state, libraries }) => {
    const { api } = libraries.source.api;

    // 1. fetch the data you want from the endpoint page
    const response = await libraries.source.api.get({
      endpoint: "categories",
      params: {
        per_page: 100, // To make sure you get all of them
        parent: 0
      }
    });

    // 2. get an array with each item in json format
    const items = await libraries.source.populate({
      response: response,
      state
    });

    // 3. add data to source
    const currentPageData = state.source.data[route];

    Object.assign(currentPageData, {
      id: 1,
      items: items
    });
  }
};