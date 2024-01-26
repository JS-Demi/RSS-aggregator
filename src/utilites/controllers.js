const modalController = (postsContainer, state) => {
  const buttons = postsContainer.querySelectorAll('button');
  buttons.forEach((button) => {
    const { posts } = state;
    const modalContainer = document.querySelector('#modal');
    button.addEventListener('click', (e) => {
      const { target } = e;
      const { link } = target.dataset;
      const { title, description } = posts.find((post) => post.link === link);
      modalContainer.querySelector('.modal-title').textContent = title;
      modalContainer.querySelector('.modal-body').textContent = description;
      const viewedPost = postsContainer.querySelector(`[data-link="${link}"]`).previousElementSibling;
      state.viewedPosts.push(viewedPost.href);
    });
  });
};

const linkController = (postsContainer, state) => {
  const links = postsContainer.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const { target } = e;
      state.viewedPosts.push(target.href);
    });
  });
};

export { modalController, linkController };
