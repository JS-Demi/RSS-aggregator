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
    usedUrls: [],
}

const state = onChange(initialState, function (path, value) {
    switch (path) {
        case 'usedUrls':
            elements.input.classList.remove('is-invalid');
            elements.feedback.textContent = '';
            break;
        case 'form.process.error':
            elements.input.classList.add('is-invalid');
            elements.feedback.textContent = value;
            break;
    }
    console.log('this:', this);
    console.log('value:', value)
})

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = elements.input.value;
    const existedUrls = state.usedUrls.map(({ url: urlEl }) => urlEl);
    console.log(existedUrls)
    const urlSchema = yup.object({
       url: yup.string(url).url('Ссылка должна быть валидным URL').notOneOf(existedUrls, 'RSS уже существует'),
    });
   const validation = urlSchema.validate({ url })
   const promise = Promise.all([validation]);
   promise.then(() => {
       state.usedUrls.push({ urlId: uniqueId(), url })
        elements.form.reset();
        elements.input.focus();
   })
   .catch((err) => {
       state.form.process.error = err.message;
    //    state.form.process.state = 'error';
    //    state.form.valid = false;
   });
});
};
export default app