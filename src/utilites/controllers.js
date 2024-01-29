const modalController = (postsContainer, currentState) => {
  const buttons = postsContainer.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const { target } = e;
      const { link } = target.dataset;
      const { posts } = currentState;
      const currentPost = posts.find((post) => post.link === link);
      const viewedPost = postsContainer.querySelector(`[data-link="${link}"]`).previousElementSibling;
      const state = currentState;
      state.displayedModal = currentPost;
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
