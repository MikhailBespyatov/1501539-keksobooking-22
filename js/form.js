import { sendData, SERVER_URL } from './api.js';
import { CENTER_COORDINATES, address, mainPinMarker } from './map.js';
import { closePopup } from './util.js';

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
const successPopup = document.querySelector('#success').content;
const successPopupContent = successPopup.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content;
const errorPopupContent = errorPopup.querySelector('.error').cloneNode(true);
const errorButton = errorPopupContent.querySelector('.error__button');

formTitle.addEventListener('input', () => {
  const titleLength = formTitle.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - titleLength} симв.`)
  } else if (titleLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите ${titleLength - MAX_TITLE_LENGTH} симв.`)
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

houseType.onchange = () => {
  const price = MIN_PRICE[houseType.value];
  pricePerNight.placeholder = `от ${price}`;
  pricePerNight.setAttribute('min', price);
};

timeIn.onchange = () => {
  timeOut.value = timeIn.value;
};

timeOut.onchange = () => {
  timeIn.value = timeOut.value;
};

const checkRoomsGuests = () => ROOMS_GUESTS[rooms.selectedIndex].includes(guests.selectedIndex);

rooms.addEventListener('change', () => {
  const isRoomsGuestsValid = checkRoomsGuests();
  if (!isRoomsGuestsValid) {
    guests.setCustomValidity('Некорректное значение! Проверьте количество гостей.');
  } else {
    guests.setCustomValidity('');
  }
  guests.reportValidity();
});

guests.addEventListener('change', () => {
  const isRoomsGuestsValid = checkRoomsGuests();
  if (!isRoomsGuestsValid) {
    guests.setCustomValidity('Некорректное значение! Проверьте количество гостей.');
  } else {
    guests.setCustomValidity('');
  }
  guests.reportValidity();
});

const resetForm = () => {
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
  mainPinMarker.setLatLng(CENTER_COORDINATES);
  document.body.append(successPopupContent);
};

resetButton.addEventListener('click', resetForm);

const getErr = () => {
  document.body.append(errorPopupContent);
};

const setFormSubmit = (onSuccess) => {
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(() => onSuccess(), getErr, SERVER_URL, new FormData(evt.target))
  });
};

closePopup(errorPopupContent, errorButton);
closePopup(successPopupContent);
setFormSubmit(resetForm);
