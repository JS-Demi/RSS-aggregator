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
const buildTree = (i18nextInstance, elements) => {
  const {
    title,
    description,
    label, addButton, exampleLink, readButton, closeButton, feedsContainer, postsContainer,
  } = elements;
  const feedsCard = createCard();
  const postsCard = createCard();
  feedsContainer.append(feedsCard);
  postsContainer.append(postsCard);
  title.textContent = i18nextInstance.t('title');
  description.textContent = i18nextInstance.t('description');
  label.textContent = i18nextInstance.t('label');
  addButton.textContent = i18nextInstance.t('addButton');
  exampleLink.textContent = i18nextInstance.t('exampleLink');
  readButton.textContent = i18nextInstance.t('readButton');
  closeButton.textContent = i18nextInstance.t('closeButton');
};

export default buildTree;
