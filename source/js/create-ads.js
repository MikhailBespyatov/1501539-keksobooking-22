import {getRandomNumber, getRandomFractionalNumber, getRandomItem, getRandomArray, shuffle}
  from './util.js';

const NUMBERS_ADS_ARRAY = 10;
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_TIME = ['12:00', '13:00', '14:00'];

const createAd = () => {
  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
    },

    offer: {
      title: 'Заголовок объявления',
      address: `${getRandomFractionalNumber(0, 100, 2)}, ${getRandomFractionalNumber(0, 100, 2)}`,
      price: getRandomNumber(100, 10000),
      type: getRandomItem(OFFER_TYPE),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(2, 10),
      checkin: getRandomItem(OFFER_TIME),
      checkout: getRandomItem(OFFER_TIME),
      features: shuffle(getRandomArray(OFFER_FEATURES)),
      description: 'Очень уютный номер с видом на перламутровый залив',
      photos: shuffle(getRandomArray(OFFER_PHOTOS)),
    },

    location: {
      x: getRandomFractionalNumber(35.65000, 35.70000, 5),
      y: getRandomFractionalNumber(139.70000, 139.80000, 5),
    },
  }
}

const createAds = (number) => new Array(number).fill(null).map(() => createAd());

createAds(NUMBERS_ADS_ARRAY);

export {createAd, createAds, NUMBERS_ADS_ARRAY};
