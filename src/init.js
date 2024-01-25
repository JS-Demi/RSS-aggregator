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

export default class {
  constructor(i18n, elements) {
    this.i18n = i18n;
    this.elements = elements;
  }

  init() {
    const {
      title,
      description,
      label, addButton, exampleLink, readButton, closeButton, feedsContainer, postsContainer,
    } = this.elements;
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
