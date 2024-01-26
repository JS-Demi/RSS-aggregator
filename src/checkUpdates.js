import axios from 'axios';
import encodeUrl from './utilites/encodingForUrl.js';
import parseRss from './utilites/parser.js';
import viewedPostsRender from './renders/viewedPostsRender.js';
import elements from './utilites/elements.js';
import { linkController, modalController } from './utilites/controllers.js';

const checkUpdates = (state) => {
  const requests = state.feeds.map(({ url }) => {
    const encodingUrl = encodeUrl(url);
    const request = axios.get(encodingUrl);
    request.catch((err) => {
      console.log(err.message);
    });
    return request;
  });

  const promise = Promise.all(requests);

  promise
    .then((responses) => {
      const currentPosts = state.posts.map(({ link }) => link);
      const updatedPosts = responses.flatMap((response) => {
        const { posts } = parseRss(response);
        return posts;
      });
      if (state.feeds[0]) {
        const newPosts = updatedPosts.filter(({ link }) => !currentPosts.includes(link));
        const { viewedPosts } = state;
        if (newPosts[0]) {
          state.posts.unshift(...newPosts);
          modalController(elements.postsContainer, state);
          linkController(elements.postsContainer, state);
          viewedPostsRender(viewedPosts, elements.postsContainer);
        }
      }
    })
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      const updateTime = 5000;
      setTimeout(() => checkUpdates(state), updateTime);
    });
};
export default checkUpdates;
