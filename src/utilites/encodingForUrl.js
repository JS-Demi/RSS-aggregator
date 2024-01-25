// export default (url) => (`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
export default (link) => {
  const url = new URL('https://allorigins.hexlet.app/get');
  url.searchParams.set('disabledCache', true);
  url.searchParams.set('url', link);
  return url.toString();
};
