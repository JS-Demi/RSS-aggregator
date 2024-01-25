import axios from 'axios';
import encodeUrl from './utilites/encodingForUrl.js';
import parseRss from './utilites/parser.js';

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
      const updatedPosts = responses.map((response, index) => {
        const { posts } = parseRss(response, index + 1);
        return posts;
      });
      if (state.feeds[0]) {
        const newPosts = updatedPosts.flat().filter(({ link }) => !currentPosts.includes(link));
        const clicked = [...document.querySelectorAll('.link-secondary')];
        const viewed = clicked.map((post) => post.getAttribute('href'));
        if (newPosts[0]) {
          state.posts.unshift(...newPosts);
          state.viewedPosts.push(...viewed);
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
