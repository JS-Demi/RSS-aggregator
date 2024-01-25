const errorRender = (value, elements, i18nextInstance) => {
  const { feedback, input } = elements;
  if (value) {
    feedback.classList.replace('text-success', 'text-danger');
    feedback.textContent = `${i18nextInstance.t(`error.${value}`)}`;
    input.classList.add('is-invalid');
  }
};
export default errorRender;
