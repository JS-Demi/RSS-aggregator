import { uniqueId } from 'lodash';

export default (response, feedId) => {
  const parse = new DOMParser();
  const normalize = parse.parseFromString(response.data.contents, 'text/xml');
  const parseError = normalize.querySelector('parseerror');
  if (parseError) {
    throw new Error('invalidRss')
  }
  const feed = {
    title: normalize.querySelector('channel title').textContent,
    description: normalize.querySelector('channel description').textContent,
  };
  const posts = [...normalize.querySelectorAll('item')]
    .map((post) => {
    const title = post.querySelector('title').textContent;
    const description = post.querySelector('description').textContent;
    const link = post.querySelector('link').textContent;
    return {
        feedId, title, description, link,
    };
  });
  posts;
return { feed, posts };
};
