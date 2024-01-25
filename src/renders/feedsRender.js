const feedsRender = (data, feedsContainer) => {
  const feeds = data.map(({ title, description }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    h3.textContent = title;
    p.textContent = description;
    li.append(h3);
    li.append(p);
    return li;
  });
  feedsContainer.querySelector('ul').replaceChildren(...feeds);
};
export default feedsRender;
