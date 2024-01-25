import { string, object } from 'yup';
import axios from 'axios';
import onChange from 'on-change';
import { uniqueId } from 'lodash';
import i18n from 'i18next';
import view, { View } from './view.js';
import resources from './locales/lang.js';
import parseRss from './parser.js';
import encodeUrl from './encodingForUrl.js';
import checkUpdates from './checkUpdates.js';

const app = async () => {
  const elements = {
    title: document.querySelector('h1'),
    description: document.querySelector('.lead'),
    label: document.querySelector('label'),
    addButton: document.querySelector('.rss-form .btn-primary'),
    exampleLink: document.querySelector('.example'),
    readButton: document.querySelector('.modal-footer .btn-primary'),
    closeButton: document.querySelector('.modal-footer .btn-secondary'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    form: document.querySelector('.rss-form'),
    postsContainer: document.querySelector('.posts'),
    feedsContainer: document.querySelector('.feeds'),
    modalContainer: document.querySelector('#modal'),
  };

  const {
    input,
    feedback,
    form,
    postsContainer,
  } = elements;

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

  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'ru',
    resources,
  })
    .then(() => {
      const buildTree = new View();
      buildTree.init(i18nInstance, elements);
      const state = onChange(initialState, view(i18nInstance, elements, state));
      checkUpdates(state);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = input.value;
        const requested = state.feeds.map(({ url }) => url);
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
              return parseRss(response, id)
          })
          .then((data) => {
            const { 
              feed: { id, title, description },
              posts } = data;
              const viewed = [...postsContainer.querySelectorAll('.link-secondary')]
              .map((post) => post.getAttribute('href'));
              state.feeds.unshift({ id, url, title, description });
              state.posts.unshift(...posts);
              state.viewedPosts.push(...viewed)
              state.form.error = null;
              state.form.state = 'sent'
              state.form.state = 'filling';
              state.lastFeedId = id;
          })
          .catch((err) => {
            console.log(err)
            state.form.error = err.message === 'Network Error' ? 'network' : err.message;
            state.form.state = 'error';
          });
      });
    });
};
export default app;
