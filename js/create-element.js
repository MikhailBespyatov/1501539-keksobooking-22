import {createAd} from './create-ads.js';
import {getRandomArray, shuffle} from './util.js';

const ad = createAd();
const getCardItem = (className) => cardTemplate.querySelector(className);

//контейнер для объявления
const cardsContainer = document.querySelector('.map__canvas');

//ссылка на шаблон
const cardTemplate = document.querySelector('#card').content;

//контент шаблона
const cartPopup = cardTemplate.querySelector('.popup');

//заголовок
const cardTitle = getCardItem('.popup__title')
cardTitle.textContent = ad.offer.title;

//адрес
const cardAdress = getCardItem('.popup__text--address');
cardAdress.textContent = ad.offer.address;

//цена
const cardPrice = getCardItem('.popup__text--price');
cardPrice.textContent = `${ad.offer.price} ₽/ночь`;

//тип жилья
const cardHousingType = getCardItem('.popup__type');
const getHousingTypeName = (arrayObject = ad.offer.type) => {
  switch(arrayObject) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
};
cardHousingType.textContent = getHousingTypeName();

//Количество гостей и комнат
const cardGuestsAndRooms = getCardItem('.popup__text--capacity');
cardGuestsAndRooms.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests}`;

//время заезда и выезда
const cardCheckinCheckout = getCardItem('.popup__text--time');
cardCheckinCheckout.textContent = `${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

//удобства
const cardFeatures = getCardItem('.popup__features');
const cardFeaturesChilds = cardFeatures.children;
const randomFeaturesArray = shuffle(getRandomArray(Array.from(cardFeaturesChilds)));

for (let i = cardFeaturesChilds.length - 1; i >= 0; i--) {
  const child = cardFeaturesChilds[i];
  child.parentElement.removeChild(child);
}

for (let i = 0; i < randomFeaturesArray.length; i++) {
  cardFeatures.appendChild(randomFeaturesArray[i]);
}

//Описание
const cardDescription = getCardItem('.popup__description');
cardDescription.textContent = ad.offer.description;

//фото объявления
const cardPhotos = getCardItem('.popup__photos');
const cardPhotosImg =  getCardItem('.popup__photo');

const getNewPhoto = (item) => {
  const newPhoto = cardPhotosImg.cloneNode(true);
  newPhoto.src = item;
  return newPhoto;
};

cardPhotos.removeChild(cardPhotosImg)

for (let i = 0; i < ad.offer.photos.length; i++) {
  const newCardPhoto = getNewPhoto(ad.offer.photos[i])
  cardPhotos.appendChild(newCardPhoto);
}

if (cardPhotos.children.length === 0) {
  cardPhotos.remove();
}

//аватарка
const cardAvatar = getCardItem('.popup__avatar');
cardAvatar.src = ad.author.avatar;

cardsContainer.appendChild(cartPopup);
