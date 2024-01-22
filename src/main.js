import { string, object } from 'yup';
import onChange from 'on-change';
import { uniqueId } from 'lodash';
import view from './view.js';
import i18n from 'i18next';
import resourses from './locales/lang.js';


const app = () => {
const elements = {
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    form: document.querySelector('.rss-form'),
    submitButton: document.querySelector('.btn-lg'),
}

const {
    input,
    feedback,
    form,
    submitButton,
} = elements;

const initialState = {
    defaultLanguage: 'ru',
    form: {
        state: 'filling',
        error: '',
        valid: null,
    },
    requested: [],
}

const i18nInstance = i18n.createInstance();
i18nInstance.init({
    lng: initialState.defaultLanguage,
    resourses,
})
.then(() => {

const state = onChange(initialState, view(i18nInstance, elements));

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;
    const requested = state.requested.map(({ url }) => url);
    const urlSchema = object({
        url: string().url('invalidUrl').notOneOf(requested, 'alreadyExist')
    });
   const validate = urlSchema.validate({ url })
   validate.then(() => {
       state.form.error = null;
       state.form.state = 'filling';
       state.requested.push({ id: uniqueId(), url })
   })
   .catch((err) => {
       state.form.error = err.message;
       state.form.state = 'error';
   });
});
})
};
export default app