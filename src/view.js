import { feedsRender, postsRender } from "./renders.js";


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
}

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
    const {
        form,
        input,
        feedback,
        addButton,
        feedsContainer,
        postsContainer,
        modalContainer,
    } = elements
  switch (path) {
    case 'form.error':
      if (value) {
        feedback.classList.replace('text-success', 'text-danger')
        feedback.textContent = `${i18nextInstance.t(`error.${value}`)}`;
        input.classList.add('is-invalid');
        
      }
      break;
    case 'form.state':
      switch (value) {
        case 'filling':
          form.reset();
          input.focus();
          break;
        case 'sending':
            addButton.setAttribute('disabled', '');
            break;
        case 'sent':
            addButton.removeAttribute('disabled');
            input.classList.remove('is-invalid');
            feedback.classList.replace('text-danger', 'text-success')
            feedback.textContent = i18nextInstance.t('success');
            feedsContainer.querySelector('.card-title').textContent = i18nextInstance.t('feeds');
            postsContainer.querySelector('.card-title').textContent = i18nextInstance.t('posts');
            break;    
         case 'error':
            addButton.removeAttribute('disabled');
            break;
        default:
          console.log(`unknow process ${value}`);
      }
      break;
      case 'feeds':
        const actualFeeds = feedsRender(value);
      feedsContainer.querySelector('ul').replaceChildren(...actualFeeds);
      break;
      case 'posts':
        const actualPosts = postsRender(value, modalContainer, i18nextInstance);
        postsContainer.querySelector('ul').replaceChildren(...actualPosts);
        break;
        case 'viewedPosts':
          const viewed = new Set(value);
          postsContainer.querySelectorAll('a').forEach((post) => {
            const link = post.getAttribute('href');
            if (viewed.has(link)) {
              post.classList.replace('fw-bold', 'fw-normal');
              post.classList.add('link-secondary');
            }
          })
          break;
    default: 
    console.log(`unknwown ${path}`);
  }
};
