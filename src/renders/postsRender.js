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
export default postsRender;
