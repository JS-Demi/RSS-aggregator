import {
  errorRender, feedsRender, postsRender, stateRender, viewedPostsRender,
} from './renders.js';

const createCard = () => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  card.append(cardBody);
  cardBody.append(h2);
  card.append(ul);
  return card;
};

export class View {
  constructor() {
    this.i18n = null;
    this.elements = null;
  }

  init(i18next, elements) {
    this.i18n = i18next;
    this.elements = elements;
    const {
      title,
      description,
      label,
      addButton,
      exampleLink,
      readButton,
      closeButton,
      feedsContainer,
      postsContainer,
      modalContainer,
    } = this.elements;
    modalContainer.querySelectorAll('button')
      .forEach((element) => {
        element.addEventListener('click', () => {
          modalContainer.classList.remove('show');
        });
      });
    const feedsCard = createCard();
    const postsCard = createCard();
    feedsContainer.append(feedsCard);
    postsContainer.append(postsCard);
    title.textContent = this.i18n.t('title');
    description.textContent = this.i18n.t('description');
    label.textContent = this.i18n.t('label');
    addButton.textContent = this.i18n.t('addButton');
    exampleLink.textContent = this.i18n.t('exampleLink');
    readButton.textContent = this.i18n.t('readButton');
    closeButton.textContent = this.i18n.t('closeButton');
  }
}

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
      postsRender(value, elements, i18nextInstance);
      break;
    case 'viewedPosts':
      viewedPostsRender(value, postsContainer);
      break;
    default:
      console.log(`unknwown ${path}`);
  }
};
