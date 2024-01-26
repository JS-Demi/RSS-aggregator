import axios from 'axios';
import onChange from 'on-change';
import i18n from 'i18next';
import view from './view.js';
import buildCardsTree from './init.js';
import elements from './utilites/elements.js';
import resources from './locales/lang.js';
import parseRss from './utilites/parser.js';
import encodeUrl from './utilites/encodingForUrl.js';
import checkUpdates from './checkUpdates.js';
import validate from './utilites/validate.js';
import { linkController, modalController } from './utilites/controllers.js';
import viewedPostsRender from './renders/viewedPostsRender.js';

const initialState = {
  defaultLanguage: 'ru',
  form: {
    state: 'filling',
    error: null,
    valid: null,
  },
  feeds: [],
  posts: [],
  viewedPosts: [],
};

export default () => {
  const { input, form, postsContainer } = elements;
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'ru',
    resources,
  })
    .then(() => {
      buildCardsTree(i18nInstance, elements);
      const state = onChange(initialState, view(i18nInstance, elements));
      checkUpdates(state);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = input.value;
        const requested = state.feeds.map(({ url: link }) => link);
        const validation = validate(url, requested);
        validation
          .then(() => {
            state.form.state = 'sending';
            const encodingUrl = encodeUrl(url);
            const request = axios.get(encodingUrl);
            return request;
          })
          .then((response) => parseRss(response, url))
          .then((data) => {
            const { feed, posts } = data;
            state.feeds.unshift(feed);
            const { viewedPosts } = state;
            state.posts.unshift(...posts);
            modalController(postsContainer, state);
            linkController(postsContainer, state);
            viewedPostsRender(viewedPosts, postsContainer);
            state.form.error = null;
            state.form.state = 'sent';
            state.form.state = 'filling';
          })
          .catch((err) => {
            console.log(err);
            state.form.error = err.message === 'Network Error' ? 'network' : err.message;
            state.form.state = 'error';
          });
      });
    });
};
