import { add } from "lodash";

export default (i18nextInstance, elements) => (path, value) => {
    console.log(i18nextInstance.t('title'))
    switch(path) {
        case 'form.error':
            if (value === null) {
                elements.feedback.textContent = '';
                elements.input.classList.remove('is-invalid');
            } else {
                elements.feedback.textContent = `${i18nextInstance.t(`error.${value}`)}`
                elements.input.classList.add('is-invalid');
            }
            break;
        case 'form.state': 
            switch (value) {
                case 'filling':
                    elements.form.reset(); 
                    elements.input.focus();
                    break;
                default: 
                console.log(`unknow process ${value}`);    
            }    
            break;   
        default: `unknwown ${path}`;        
    }
}

export class View {
    constructor() {
        this.i18n = null;
        this.elements = null;
    }

    init(i18next, elements) {
        this.i18n = i18next;
        this.elements = elements;
        const {
            title,
            description,
            label,
            addButton,
            exampleLink,
        } = this.elements;
        title.textContent = this.i18n.t('title');
        description.textContent = this.i18n.t('description');
        label.textContent = this.i18n.t('label');
        addButton.textContent = this.i18n.t('addButton');
        exampleLink.textContent = this.i18n.t('exampleLink')
    }
}