import { string, object } from 'yup';
import axios from 'axios';
import onChange from 'on-change';
import i18n from 'i18next';
import view, { View } from './view.js';
import elements from './utilites/elements.js';
import resources from './locales/lang.js';
import parseRss from './utilites/parser.js';
import encodeUrl from './utilites/encodingForUrl.js';
import checkUpdates from './checkUpdates.js';

const initialState = {
  defaultLanguage: 'ru',
  form: {
    state: 'filling',
    error: null,
    valid: null,
  },
  feeds: [],
  posts: [],
  lastFeedId: 0,
  viewedPosts: [],
};

const { input, form, postsContainer } = elements;

export default () => {
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'ru',
    resources,
  })
    .then(() => {
      const buildTree = new View();
      buildTree.init(i18nInstance, elements);
      const state = onChange(initialState, view(i18nInstance, elements));
      checkUpdates(state);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = input.value;
        const requested = state.feeds.map(({ url: link }) => link);
        const urlSchema = object({
          url: string().url('invalidUrl').notOneOf(requested, 'alreadyExist'),
        });
        const validate = urlSchema.validate({ url });
        validate
          .then(() => {
            state.form.state = 'sending';
            const encodingUrl = encodeUrl(url);
            const request = axios.get(encodingUrl);
            return request;
          })
          .then((response) => {
            const id = state.lastFeedId + 1;
            return parseRss(response, id);
          })
          .then((data) => {
            const {
              feed: { id, title, description },
              posts,
            } = data;
            const viewed = [...postsContainer.querySelectorAll('.link-secondary')]
              .map((post) => post.getAttribute('href'));
            state.feeds.unshift({
              id, url, title, description,
            });
            state.posts.unshift(...posts);
            state.viewedPosts.push(...viewed);
            state.form.error = null;
            state.form.state = 'sent';
            state.form.state = 'filling';
            state.lastFeedId = id;
          })
          .catch((err) => {
            console.log(err);
            state.form.error = err.message === 'Network Error' ? 'network' : err.message;
            state.form.state = 'error';
          });
      });
    });
};
