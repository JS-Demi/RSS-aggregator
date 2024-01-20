import * as yup from 'yup';
import onChange from 'on-change';
import { uniqueId } from 'lodash';

const app = () => {
    

const elements = {
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    form: document.querySelector('.rss-form'),
    submitButton: document.querySelector('.btn-lg'),
}

const initialState = {
    form: {
        process: {
    state: 'filling',
    error: null,
        },
        valid: null,
    },
    urlList: [],
}

const view = (state) => (path, value) => {
    switch (path) {
        case 'form.process.error':
            elements.input.classList.add('is-invalid');
            elements.feedback.textContent = value;
            break;
            case 'urlList':
                elements.input.classList.remove('is-invalid');
                elements.feedback.textContent = ''
                break;
    }
}

const state = onChange(initialState, view(initialState))

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = elements.form.elements.url.value;
    const currentUrlList = state.urlList.map(({ url: urlEl }) => urlEl)
    console.log(currentUrlList)
    const urlSchema = yup.object({
        url: yup.string().url('Ссылка должна быть валидным URL').notOneOf(currentUrlList, 'RSS уже существует'),
    });
   const validation = urlSchema.validate({ url })
   const promise = Promise.all([validation]);
   promise.then(() => {
    state.urlList.push({ urlId: uniqueId(), url })
   })
   .catch((err) => {
        state.form.valid = false;
        state.form.process.state = 'error';
        state.form.process.error = err.message;
   })
});
// console.log(watchedState)
};
export default app