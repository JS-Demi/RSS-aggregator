const modalRender = (post) => {
  const modalContainer = document.querySelector('#modal');
  const { title, description } = post;
  modalContainer.querySelector('.modal-title').textContent = title;
  modalContainer.querySelector('.modal-body').textContent = description;
};
export default modalRender;
