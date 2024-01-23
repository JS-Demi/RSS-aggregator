const feedsRender = (data) => {
    const feed = data.map(({ title, description }) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'border-0','border-end-0');
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
    return feed;
}

const postsRender = (data, modal, i18n) => {
    const posts = data.map(({ id, title, description, link }) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
        const a = document.createElement('a');
        a.classList.add('fw-bold');
        a.href = link;
        a.dataset.id = id;
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer')
        a.textContent = title;
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        button.dataset.id = id;
        button.dataset.bsToggle = 'modal';
        button.dataset.bsTarget = '#modal';
        button.textContent = i18n.t('view')
        button.addEventListener('click', () => {
            const modalTitle = modal.querySelector('.modal-title');
            modalTitle.textContent = title;
            const modalBody = modal.querySelector('.modal-body');
            modalBody.textContent = description;
            modal.querySelector('a').href = link
            modal.classList.add('show');
        });
        li.append(a, button);
        return li;
    });
    return posts;
}
export { feedsRender, postsRender };