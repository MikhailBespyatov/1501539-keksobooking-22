const formInfo = document.querySelector('.ad-form');
const formInfoFieldsets = formInfo.querySelectorAll('fieldset');
const formFilters = document.querySelector('.map__filters');
const formFiltersFieldset = formFilters.querySelector('#housing-features');
const formFiltersSelects = formFilters.querySelectorAll('select');


formInfo.classList.add('ad-form--disabled');
formFilters.classList.add('map__filters--disabled');
formInfoFieldsets.forEach((element) => element.setAttribute('disabled', 'disabled'));
formFiltersFieldset.setAttribute('disabled', 'disabled');
formFiltersSelects.forEach((element) => element.setAttribute('disabled', 'disabled'));


const setActiveForm = () => {
  formInfo.classList.remove('ad-form--disabled');
  formInfoFieldsets.forEach((element) => element.removeAttribute('disabled'));
};

const setActiveFilter = () => {
  formFilters.classList.remove('map__filters--disabled');
  formFiltersFieldset.removeAttribute('disabled');
  formFiltersSelects.forEach((element) => element.removeAttribute('disabled'));
};


export { setActiveForm, setActiveFilter };
