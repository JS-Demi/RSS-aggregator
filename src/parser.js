import { uniqueId } from 'lodash';

export default (data) => {
  const parse = new DOMParser();
  const normalize = parse.parseFromString(data, 'text/xml');
  if (normalize.querySelector('rss')) {
  const feed = {
    title: normalize.querySelector('channel title').textContent,
    description: normalize.querySelector('channel description').textContent,
  };
  const posts = [...normalize.querySelectorAll('item')]
    .map((post) => {
    const title = post.querySelector('title').textContent;
    const description = post.querySelector('description').textContent;
    const link = post.querySelector('link').textContent;
    const id = uniqueId();
    return {
      id, title, description, link,
    };
  });
  posts;
return { feed, posts }
  }
  throw new Error('invalidRss')
};
