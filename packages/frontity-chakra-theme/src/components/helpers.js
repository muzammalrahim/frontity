function getSrcSet(media) {
  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map(item => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;
  return srcset;
}

export function getMediaAttributes(state, id) {
  const media = state.source.attachment[id];
  if (!media) return {};

  const srcSet = getSrcSet(media);

  return {
    id,
    alt: media.alt_text,
    src: media.source_url,
    srcSet
  };
}

export function getPostCategories(state, post) {
  const allCategories = state.source.category;
  // console.log('postCat', post);
  const categories =
    post.categories && post.categories.map(
        (catId, index) => {
          if(Object.prototype.toString.call(post.categories[index]) === '[object Object]'){
            console.log('object: ',post.categories[index].cat_ID);
            return allCategories[post.categories[index].cat_ID];
          }else{
            return allCategories[catId];
          }
        });
            // (Object.prototype.toString.call(allCategories[index]) === '[object Object]') ? post.categories[index].cat_ID : allCategories[catId]);
  /*const categories =
    post.categories && post.categories.map((catId, index) => console.log('obj: ', post.categories[index]));*/
  return categories ? categories.filter(Boolean) : [];
}

export function getPostAuthor(state, post) {
  return post.author ? state.source.author[post.author] : state.source.author[post.meta.author] ;
}

export function getPostTags(state, post) {
  const allTags = state.source.tag;
  const tags = post.tags && post.tags.map(tagId => allTags[tagId]);
  return tags ? tags.filter(Boolean) : [];
}

export function getPostData(state) {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  return { ...post, isReady: data.isReady, isPage: data.isPage };
}

export function formatPostData(state, post) {
  return {
    id: post.id,
    author: getPostAuthor(state, post),
    publishDate: post.date,
    title: post.title.rendered ? post.title.rendered : post.title,
    categories: getPostCategories(state, post),
    tags: getPostTags(state, post),
    link: post.link,
    featured_media: getMediaAttributes(state, post.featured_media),
    content: post.content.rendered ? post.content.rendered : post.content,
    excerpt: post.excerpt.rendered ? post.excerpt.rendered : post.excerpt
  };
}

export function splitPosts(state, routeData, splitCount) {
  const firstThreePosts = [];
  const otherPosts = [];

  routeData && routeData.forEach((item, idx) => {
    const itemData = state.source[item.type][item.id];
    if (idx < splitCount) firstThreePosts.push(itemData);
    else otherPosts.push(itemData);
  });

  return [firstThreePosts, otherPosts];
}

export function omitConnectProps(props) {
  const out = {};
  const propsToOmit = [
    "state",
    "actions",
    "roots",
    "fills",
    "libraries",
    "getSnapshot"
  ];
  const isGetSnapshot = prop =>
    typeof prop === "function" && prop.name === "getSnapshot";

  for (const prop in props) {
    if (propsToOmit.includes(prop) || isGetSnapshot(prop)) continue;
    out[prop] = props[prop];
  }

  return out;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novemeber",
  "December"
];

const formatDay = day => {
  const lastLetter = day[day.length - 1];
  if (lastLetter) return `${day}nd`;
  if (lastLetter) return `${day}st`;
  if (lastLetter) return `${day}rd`;
  return `${day}th`;
};

export function formatDate(date) {
  const jsDate = new Date(date);
  const day = jsDate.getDate();
  const month = jsDate.getMonth();
  const year = jsDate.getFullYear();

  return `${formatDay(day)} ${monthNames[month]}, ${year}`;
}

export function timeDiff(date) {
  const jsDate = new Date(date);
  var ms_Min = 60 * 1000; // milliseconds in Minute
  var ms_Hour = ms_Min * 60; // milliseconds in Hour
  var ms_Day = ms_Hour * 24; // milliseconds in day
  var ms_Mon = ms_Day * 30; // milliseconds in Month
  var ms_Yr = ms_Day * 365; // milliseconds in Year
  var days = 24*60*60*1000;
  var diff = new Date() - jsDate; //difference between dates.
  var diffDays = Math.floor(diff / days);
  // If the diff is less then milliseconds in a minute
  if (diff < ms_Min) {
      return Math.round(diff / 1000) + ' seconds ago';

      // If the diff is less then milliseconds in a Hour
  } else if (diff < ms_Hour) {
      return Math.round(diff / ms_Min) + ' minutes ago';

      // If the diff is less then milliseconds in a day
  } else if (diff < ms_Day) {
      return Math.round(diff / ms_Hour) + ' hours ago';

      // If the diff is less then milliseconds in a Month
  } else if (diffDays < 7) {
      return diffDays + ' days ago';
      // If the diff is less then milliseconds in a year
  } else if(diffDays === 7){
      return '1 week ago';
  }else if (diffDays > 7 &&  diffDays <= 14)
  {
      return "2 weeks ago";
  }
  else if (diffDays === 30 || diffDays === 31)
  {
      return "1 month ago";
  }else{
      return formatDate(date);
  }
}

export function isUrl(str) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-/]))?/;
  return regexp.test(str);
}

export function debounce(fn) {
  let queued = null;
  return [
    (...args) => {
      if (queued) cancelAnimationFrame(queued);
      queued = requestAnimationFrame(fn.bind(fn, ...args));
    },
    () => {
      cancelAnimationFrame(queued);
    }
  ];
}