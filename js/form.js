const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const ONE_ROOMS_INDEX = 0;
const TWO_ROOMS_INDEX = 1;
const THREE_ROOMS_INDEX = 2;
const HUNDRED_ROOMS_INDEX = 3;
const ROOMS_GUESTS = {
  0: [2],
  1: [1, 2],
  2: [0, 1, 2],
  3: [3],
};

const formTitle = document.querySelector('#title');
const houseType = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');

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

const checkRoomsGuests = () => {
  const selectedRoom = rooms.selectedIndex;
  const selectedGuests = guests.selectedIndex;

  switch (selectedRoom) {
    case ONE_ROOMS_INDEX:
      return ROOMS_GUESTS[ONE_ROOMS_INDEX].includes(selectedGuests);
    case TWO_ROOMS_INDEX:
      return ROOMS_GUESTS[TWO_ROOMS_INDEX].includes(selectedGuests);
    case THREE_ROOMS_INDEX:
      return ROOMS_GUESTS[THREE_ROOMS_INDEX].includes(selectedGuests);
    case HUNDRED_ROOMS_INDEX:
      return ROOMS_GUESTS[HUNDRED_ROOMS_INDEX].includes(selectedGuests);
    default:
      return false;
  }
};

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

