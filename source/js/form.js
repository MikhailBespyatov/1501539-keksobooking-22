import { sendData, SERVER_URL, getData, DATA_URL } from './api.js';
import { CENTER_COORDINATES, address, mainPinMarker } from './map.js';
import { clearFilter } from './filter.js';
import { clearPhotoPreview } from './image-load.js';
import { createMarkers, getError } from './map.js'

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};
const ROOMS_GUESTS = {
  0: [2],
  1: [1, 2],
  2: [0, 1, 2],
  3: [3],
};
const ADDRESS_TIME = 0;
const ERROR_BORDER = '2px solid red';
const SUCCES_BORDER = '1px solid #d9d9d3';

const mainContent = document.querySelector('main');
const formAd = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const formTitle = document.querySelector('#title');
const houseType = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const description = document.querySelector('#description');
const formFeaturesList = document.querySelector('.features');
const formfeaturesItems = formFeaturesList.querySelectorAll('[name="features"]');
const successPopup = document.querySelector('#success').content;
const successPopupContent = successPopup.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content;
const errorPopupContent = errorPopup.querySelector('.error').cloneNode(true);
const errorButton = errorPopupContent.querySelector('.error__button');
const submitButton = document.querySelector('.ad-form__submit');

pricePerNight.setAttribute('min', MIN_PRICE[houseType.value]);
successPopupContent.style.zIndex = 1000;
errorPopupContent.style.zIndex = 1000;

const inputTitleHandler = () => {
  const titleLength = formTitle.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - titleLength} симв.`)
  } else if (titleLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите ${titleLength - MAX_TITLE_LENGTH} симв.`)
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
};

const inputHousePriceHandler = () => {
  const price = MIN_PRICE[houseType.value];
  pricePerNight.placeholder = `${price}`;
  pricePerNight.setAttribute('min', price);
};

const inputTimeInHandler = () => {
  timeOut.value = timeIn.value;
};

const inputTimeOutHandler = () => {
  timeIn.value = timeOut.value;
};

const checkRoomsGuests = () => ROOMS_GUESTS[rooms.selectedIndex].includes(guests.selectedIndex);

const inputRoomsHandler = () => {
  const isRoomsGuestsValid = checkRoomsGuests();
  if (!isRoomsGuestsValid) {
    guests.setCustomValidity('Некорректное значение! Проверьте количество гостей.');
  } else {
    guests.setCustomValidity('');
  }
  guests.reportValidity();
};

const inputGuestsHandler = () => {
  const isRoomsGuestsValid = checkRoomsGuests();
  if (!isRoomsGuestsValid) {
    guests.setCustomValidity('Некорректное значение! Проверьте количество гостей.');
  } else {
    guests.setCustomValidity('');
  }
  guests.reportValidity();
};

const resetButtonHandler = () => {
  setTimeout(() => {
    address.value =
      `${CENTER_COORDINATES.lat.toFixed(5)}, ${CENTER_COORDINATES.lng.toFixed(5)}`;
  }, ADDRESS_TIME);
  pricePerNight.placeholder = `${MIN_PRICE['flat']}`;
  mainPinMarker.setLatLng(CENTER_COORDINATES);
  clearFilter();
  clearPhotoPreview();
  getData( DATA_URL, (cards) => { createMarkers(cards); }, getError );
};

const submitFormHandler = (evt) => {
  evt.preventDefault();
  sendData( onFormSubmitClick, openErrorPopup, SERVER_URL, new FormData(evt.target));
  getData( DATA_URL, (cards) => { createMarkers(cards); }, getError );
};

const onWindowClickSuccesPopup = () => {
  successPopupContent.remove();
  window.removeEventListener('click', onWindowClickSuccesPopup);
  window.removeEventListener('keydown', onSuccesPopupEscKeydown);
};

const onSuccesPopupEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    successPopupContent.remove();
    window.removeEventListener('click', onWindowClickSuccesPopup);
    window.removeEventListener('keydown', onSuccesPopupEscKeydown);
  }
};

const openSuccesPopup = () => {
  mainContent.appendChild(successPopupContent);
  window.addEventListener('click', onWindowClickSuccesPopup);
  window.addEventListener('keydown', onSuccesPopupEscKeydown);
};

const clearForm = () => {
  formTitle.value = '';
  houseType.value = 'flat';
  timeIn.value = '12:00';
  timeOut.value = '12:00';
  address.value =
    `${CENTER_COORDINATES.lat.toFixed(5)}, ${CENTER_COORDINATES.lng.toFixed(5)}`;
  rooms.value = '1';
  guests.value = '1';
  description.value = '';
  pricePerNight.value = '';
  pricePerNight.placeholder = `${MIN_PRICE['flat']}`;
  formfeaturesItems.forEach((element) => {
    element.checked = false;
  });
  mainPinMarker.setLatLng(CENTER_COORDINATES);
};

const onFormSubmitClick = () => {
  clearPhotoPreview();
  clearForm();
  clearFilter();
  openSuccesPopup();
};

const onWindowClickErrorPopup = () => {
  errorPopupContent.remove();
  window.removeEventListener('click', onWindowClickErrorPopup);
  window.removeEventListener('keydown', onErrorPopupEscKeydown);
  errorButton.removeEventListener('click', onErrorButtonClick);
};

const onErrorPopupEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    errorPopupContent.remove();
    window.removeEventListener('click', onWindowClickErrorPopup);
    window.removeEventListener('keydown', onErrorPopupEscKeydown);
    errorButton.removeEventListener('click', onErrorButtonClick);
  }
};

const onErrorButtonClick = () => {
  errorPopupContent.remove();
  errorButton.removeEventListener('click', onErrorButtonClick);
  window.removeEventListener('click', onWindowClickErrorPopup);
  window.removeEventListener('keydown', onErrorPopupEscKeydown);
};

const openErrorPopup = () => {
  mainContent.append(errorPopupContent);
  window.addEventListener('click', onWindowClickErrorPopup);
  window.addEventListener('keydown', onErrorPopupEscKeydown);
  errorButton.addEventListener('click', onErrorButtonClick);
};

const checkValidityTemplate = (element) => {
  if (element.checkValidity() === false) {
    element.style.border = ERROR_BORDER;
    element.addEventListener('change', () => {
      element.style.border = element.checkValidity() ? SUCCES_BORDER : ERROR_BORDER;
    });
  }
};

const checkValidityHandler = () => {
  checkValidityTemplate(formTitle);
  checkValidityTemplate(pricePerNight);
  checkValidityTemplate(guests);
};

const init = () => {
  formTitle.addEventListener('input', inputTitleHandler);
  houseType.addEventListener('change', inputHousePriceHandler);
  timeIn.addEventListener('change', inputTimeInHandler);
  timeOut.addEventListener('change', inputTimeOutHandler);
  rooms.addEventListener('change', inputRoomsHandler);
  guests.addEventListener('change', inputGuestsHandler);
  formAd.addEventListener('submit', submitFormHandler);
  resetButton.addEventListener('click', resetButtonHandler);
  submitButton.addEventListener('click', checkValidityHandler);
};

init();
