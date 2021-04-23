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

    console.log('siderbar: ', items);

    // 3. add info to data
    Object.assign(state.source.data[route], {
      id: 1,
      items: items
    });
  }
};