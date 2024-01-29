import errorRender from './renders/errorRender.js';
import stateRender from './renders/stateRender.js';
import postsRender from './renders/postsRender.js';
import feedsRender from './renders/feedsRender.js';
import viewedPostsRender from './renders/viewedPostsRender.js';
import modalRender from './renders/modalRender.js';

export default (i18nextInstance, elements) => (path, value) => {
  const { feedsContainer, postsContainer } = elements;
  switch (path) {
    case 'form.error':
      errorRender(value, elements, i18nextInstance);
      break;
    case 'form.state':
      stateRender(value, elements, i18nextInstance);
      break;
    case 'feeds':
      feedsRender(value, feedsContainer);
      break;
    case 'posts':
      postsRender(value, postsContainer, i18nextInstance);
      break;
    case 'viewedPosts':
      viewedPostsRender(value, postsContainer);
      break;
    case 'displayedModal':
      modalRender(value);
      break;
    default:
      throw new Error(`unknwown ${path}`);
  }
};
