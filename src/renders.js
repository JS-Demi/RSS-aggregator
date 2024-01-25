const feedsRender = (data, feedsContainer) => {
  const feeds = data.map(({ title, description }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    h3.textContent = title;
    p.textContent = description;
    li.append(h3);
    li.append(p);
    return li;
  });
  feedsContainer.querySelector('ul').replaceChildren(...feeds);
};

const postsRender = (data, elements, i18n) => {
  const { modalContainer, postsContainer } = elements;
  const posts = data.map(({
    id, title, description, link,
  }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.href = link;
    a.dataset.id = id;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.textContent = title;
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.dataset.id = id;
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#modal';
    button.textContent = i18n.t('view');
    button.addEventListener('click', (e) => {
      const modalTitle = modalContainer.querySelector('.modal-title');
      modalTitle.textContent = title;
      const modalBody = modalContainer.querySelector('.modal-body');
      modalBody.textContent = description;
      modalContainer.querySelector('a').href = link;
      modalContainer.classList.add('show');
      const { target } = e;
      target.previousElementSibling.classList.replace('fw-bold', 'fw-normal');
      target.previousElementSibling.classList.add('link-secondary');
    });
    a.addEventListener('click', (e) => {
      const { target } = e;
      target.classList.replace('fw-bold', 'fw-normal');
      target.classList.add('link-secondary');
    });
    li.append(a, button);
    return li;
  });
  postsContainer.querySelector('ul').replaceChildren(...posts);
};

const viewedPostsRender = (value, postsContainer) => {
  const viewed = new Set(value);
  postsContainer.querySelectorAll('a').forEach((post) => {
    const link = post.getAttribute('href');
    if (viewed.has(link)) {
      post.classList.replace('fw-bold', 'fw-normal');
      post.classList.add('link-secondary');
    }
  });
};

const stateRender = (value, elements, i18nextInstance) => {
  const {
    form,
    input,
    feedback,
    addButton,
    feedsContainer,
    postsContainer,
  } = elements;

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
      feedback.classList.replace('text-danger', 'text-success');
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
};

const errorRender = (value, elements, i18nextInstance) => {
  const { feedback, input } = elements;
  if (value) {
    feedback.classList.replace('text-success', 'text-danger');
    feedback.textContent = `${i18nextInstance.t(`error.${value}`)}`;
    input.classList.add('is-invalid');
  }
};

export {
  feedsRender, postsRender, viewedPostsRender, stateRender, errorRender,
};
