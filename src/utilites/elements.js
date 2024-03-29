const getElements = () => ({
  title: document.querySelector('section h1'),
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
});
export default getElements;
