const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const houseType = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

houseType.onchange = () => {
  const price = MIN_PRICE[houseType.value];
  pricePerNight.placeholder = price;
  pricePerNight.setAttribute('min', price);
};

timeIn.onchange = () => {
  timeOut.value = timeIn.value;
};

timeOut.onchange = () => {
  timeIn.value = timeOut.value;
};
