export default (i18nextInstance, elements) => (path, value) => {
    console.log(i18nextInstance.t(`error.${value}`))
    switch(path) {
        case 'form.error':
            if (value === null) {
                elements.form.reset(); 
                elements.input.focus();
                elements.feedback.textContent = '';
                elements.input.classList.remove('is-invalid');
            } else {
                elements.feedback.textContent = i18nextInstance.t(`error.${value}`)
                elements.input.classList.add('is-invalid');
            }
            break;
        default: `unknwown ${path}`;        
    }
}