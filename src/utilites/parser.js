export default (response) => {
  const parse = new DOMParser();
  const normalize = parse.parseFromString(response.data.contents, 'text/xml');
  const parseError = normalize.querySelector('parsererror');
  if (parseError) {
    throw new Error('invalidRss');
  }
  const { url } = response.data.status;
  const feed = {
    url,
    title: normalize.querySelector('channel title').textContent,
    description: normalize.querySelector('channel description').textContent,
  };
  const posts = [...normalize.querySelectorAll('item')]
    .map((post) => {
      const title = post.querySelector('title').textContent;
      const description = post.querySelector('description').textContent;
      const link = post.querySelector('link').textContent;
      const feedLink = url;
      return {
        feedLink, title, description, link,
      };
    });
  return { feed, posts };
};
