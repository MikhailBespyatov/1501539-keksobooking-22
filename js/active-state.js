const formInfo = document.querySelector('.ad-form');
const formInfoFieldsets = formInfo.querySelectorAll('fieldset');
const formFiltres = document.querySelector('.map__filters');
const formFiltresFieldset = formFiltres.querySelector('#housing-features');
const formFiltresSelects = formFiltres.querySelectorAll('select');


formInfo.classList.add('ad-form--disabled');
formFiltres.classList.add('ad-form--disabled');
formInfoFieldsets.forEach((element) => element.setAttribute('disabled', 'disabled'));
formFiltresFieldset.setAttribute('disabled', 'disabled');
formFiltresSelects.forEach((element) => element.setAttribute('disabled', 'disabled'));


const getActiveState = () => {
  formInfo.classList.remove('ad-form--disabled');
  formFiltres.classList.remove('ad-form--disabled');
  formInfoFieldsets.forEach((element) => element.removeAttribute('disabled', 'disabled'));
  formFiltresFieldset.removeAttribute('disabled', 'disabled');
  formFiltresSelects.forEach((element) => element.removeAttribute('disabled', 'disabled'));
};

export { getActiveState };
