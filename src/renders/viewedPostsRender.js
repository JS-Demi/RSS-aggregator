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
export default viewedPostsRender;
