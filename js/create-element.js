import { createAds, createAd } from './create-ads.js';
import { getRandomArray, shuffle } from './util.js';

const ad = createAd();
const ads = createAds(10);

//контейнер для объявления
const cardsContainer = document.querySelector('.map__canvas');

const createCard = (obj) => {
  //ссылка на шаблон
  const cardTemplate = document.querySelector('#card').content;

  //контент шаблона
  const cardPopup = cardTemplate.querySelector('.popup');

  //заголовок
  const cardTitle = cardTemplate.querySelector('.popup__title')
  cardTitle.textContent = obj.offer.title;

  //адрес
  const cardAdress = cardTemplate.querySelector('.popup__text--address')
  cardAdress.textContent = obj.offer.address;

  //цена
  const cardPrice = cardTemplate.querySelector('.popup__text--price')
  cardPrice.textContent = `${obj.offer.price} ₽/ночь`;

  //тип жилья
  const cardHousingType = cardTemplate.querySelector('.popup__type');
  const getHousingTypeName = (item) => {
    switch (item) {
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
  cardHousingType.textContent = getHousingTypeName(obj.offer.type);

  //Количество гостей и комнат
  const cardGuestsAndRooms = cardTemplate.querySelector('.popup__text--capacity')
  cardGuestsAndRooms.textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests}`;

  //время заезда и выезда
  const cardCheckinCheckout = cardTemplate.querySelector('.popup__text--time')
  cardCheckinCheckout.textContent = `${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;

  //удобства
  const cardFeatures = cardTemplate.querySelector('.popup__features');
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
  const cardDescription = cardTemplate.querySelector('.popup__description')
  cardDescription.textContent = obj.offer.description;

  //фото объявления
  const cardPhotos = cardTemplate.querySelector('.popup__photos');
  const cardPhotosImg = cardTemplate.querySelector('.popup__photo');

  const getNewPhoto = (item) => {
    const newPhoto = cardPhotosImg.cloneNode(true);
    newPhoto.src = item;
    return newPhoto;
  };

  cardPhotos.removeChild(cardPhotosImg)

  for (let i = 0; i < obj.offer.photos.length; i++) {
    const newCardPhoto = getNewPhoto(obj.offer.photos[i])
    cardPhotos.appendChild(newCardPhoto);
  }

  if (cardPhotos.children.length === 0) {
    cardPhotos.remove();
  }

  //аватарка
  const cardAvatar = cardTemplate.querySelector('.popup__avatar')
  cardAvatar.src = obj.author.avatar;

  cardsContainer.appendChild(cardPopup);
};

createCard(ad);

createCard(ads[0]);
