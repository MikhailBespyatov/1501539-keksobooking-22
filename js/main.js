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

const unique = (array) => {
  return Array.from(new Set(array));
};

const offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const randomOfferFeatures =
new Array(getRandomNumber(1, 10)).fill(null).map(() => getRandomOfferItem(offerFeatures));

const uniqueOfferFeatures = unique(randomOfferFeatures);

const randomOfferPhotos =
new Array(getRandomNumber(1, 10)).fill(null).map(() => getRandomOfferItem(offerPhotos));

const createAd = () => {
  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
    },

    offer: {
      title: 'Заголовок объявления',
      address: `${getRandomFractionalNumber(0, 100, 2)}, ${getRandomFractionalNumber(0, 100, 2)}`,
      price: `${getRandomNumber(100, 10000)}`,
      type: 'palace',
      rooms: `${getRandomNumber(1, 5)}`,
      guests: `${getRandomNumber(2, 10)}`,
      checkin: '14:00',
      checkout: '12:00',
      features: uniqueOfferFeatures,
      description: 'Очень уютный номер с видом на перламутровый залив',
      photos: randomOfferPhotos,
      location: {
        x: getRandomFractionalNumber(35.65000, 35.70000, 5),
        y: getRandomFractionalNumber(139.70000, 139.80000, 5),
      },
    },
  }
}

const NUMBERS_ADS_ARRAY = 10;

const createAds = () => {
  return new Array(NUMBERS_ADS_ARRAY).fill(null).map(() => createAd());
};

createAds();
