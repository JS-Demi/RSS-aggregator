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
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    modal: document.querySelector('#modal'),
  };

  const {
    input,
    feedback,
    form,
  } = elements;

  const initialState = {
    defaultLanguage: 'ru',
    form: {
      state: 'filling',
      error: null,
      valid: null,
    },
    requested: [],
    feeds: [],
    posts: [],
    lastPostId: 0,
  };

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
        const requested = state.requested.map(({ url }) => url);
        const urlSchema = object({
          url: string().url('invalidUrl').notOneOf(requested, 'alreadyExist'),
        });
        const validate = urlSchema.validate({ url });
        const id = uniqueId();
        validate
          .then(() => {
            state.form.state = 'sending';
            const encodingUrl = encodeUrl(url);
            const request = axios.get(encodingUrl);
            return request;
          })
          .then((response) => {
              const { feed, posts } = parseRss(response, state.lastPostId);
              state.feeds.unshift(feed);
              state.posts.unshift(...posts);
              state.form.error = null;
              state.form.state = 'sent'
              state.requested.push({ id, url });
              state.form.state = 'filling';
          })
          .catch((err) => {
            state.form.error = err.message === 'Network Error' ? 'network' : err.message;
            state.form.state = 'error';
          });
      });
    });
};
export default app;
