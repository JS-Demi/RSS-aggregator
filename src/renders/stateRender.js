const stateRender = (value, elements, i18nextInstance) => {
  const {
    form, input, feedback, addButton, feedsContainer, postsContainer,
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
      throw new Error(`Unknown process ${value}`);
  }
};
export default stateRender;
