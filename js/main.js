const NUMBERS_ADS_ARRAY = 10;
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_TIME = ['12:00', '13:00', '14:00'];

const getRandomNumber = (min = 0, max = 1) => {
  if (min >= 0 && max >= 0) {
    return (min >= max)
      ? Math.round(Math.random() * (min - max) + max)
      : Math.round(Math.random() * (max - min) + min);
  }
};

const getRandomFractionalNumber = (min = 0, max = 1, numbersAfterPoint) => {
  if (min >= 0 && max >= 0 && numbersAfterPoint >= 0) {
    return (min >= max)
      ? parseFloat((Math.random() * (min - max) + max).toFixed(numbersAfterPoint))
      : parseFloat((Math.random() * (max - min) + min).toFixed(numbersAfterPoint));
  }
};

const getRandomOfferItem = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const randomOfferArray = (array) => {
  return new Array(getRandomNumber(1, array.length)).fill(null).map(() => getRandomOfferItem(array));
};

const unique = (array) => {
  return Array.from(new Set(array));
};

const uniqueOfferArray = (array) => {
  return unique(randomOfferArray(array));
};

const createAd = () => {
  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
    },

    offer: {
      title: 'Заголовок объявления',
      address: `${getRandomFractionalNumber(0, 100, 2)}, ${getRandomFractionalNumber(0, 100, 2)}`,
      price: `${getRandomNumber(100, 10000)}`,
      type: `${getRandomOfferItem(OFFER_TYPE)}`,
      rooms: `${getRandomNumber(1, 5)}`,
      guests: `${getRandomNumber(2, 10)}`,
      checkin: `${getRandomOfferItem(OFFER_TIME)}`,
      checkout: `${getRandomOfferItem(OFFER_TIME)}`,
      features: uniqueOfferArray(OFFER_FEATURES),
      description: 'Очень уютный номер с видом на перламутровый залив',
      photos: uniqueOfferArray(OFFER_PHOTOS),
    },

    location: {
      x: getRandomFractionalNumber(35.65000, 35.70000, 5),
      y: getRandomFractionalNumber(139.70000, 139.80000, 5),
    },
  }
}

const createAds = (number) => {
  return new Array(number).fill(null).map(() => createAd());
};

createAds(NUMBERS_ADS_ARRAY);
