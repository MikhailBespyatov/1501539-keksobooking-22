import {createAds, NUMBERS_ADS_ARRAY} from './create-ads.js';

const HOUSE_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};
const GUEST_TEXT_FORMS = ['гостя', 'гостей'];
const ROOM_TEXT_FORMS = ['комната', 'комнаты', 'комнат'];
const ads = createAds(NUMBERS_ADS_ARRAY);
const cardTemplate = document.querySelector('#card').content;

const renderCardFeatures = (array, block) => {
  const fragment = document.createDocumentFragment();
  block.innerHTML = '';

  for (let i = 0; i < array.length; i++) {
    const cardFeatureItem = document.createElement('li');
    cardFeatureItem.classList.add('popup__feature', `popup__feature--${array[i]}`);
    fragment.appendChild(cardFeatureItem);
  }

  return fragment;
};

const renderCardPhoto = (array, block) => {
  const fragment = document.createDocumentFragment();
  block.innerHTML = '';

  for (let i = 0; i < array.length; i++) {
    const cardPhotosItem = document.createElement('img');
    cardPhotosItem.classList.add('popup__photo');
    cardPhotosItem.src = array[i];
    cardPhotosItem.alt = 'Фотография жилья';
    cardPhotosItem.width = 45;
    fragment.appendChild(cardPhotosItem);
  }

  return fragment;
};

const declOfNumRoom = (n, textForms) => {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 == 1) {
    return textForms[0];
  }
  return textForms[2];
}

const declOfNumGuest = (n, textForms) => {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n1 == 1) {
    return textForms[0];
  }
  return textForms[1];
}

const createCard = (object) => {
  const cardPopup = cardTemplate.querySelector('.popup').cloneNode(true);
  const cardTitle = cardPopup.querySelector('.popup__title');
  const cardAddress = cardPopup.querySelector('.popup__text--address');
  const cardPrice = cardPopup.querySelector('.popup__text--price');
  const cardHousingType = cardPopup.querySelector('.popup__type');
  const cardGuestsAndRooms = cardPopup.querySelector('.popup__text--capacity');
  const cardCheckinCheckout = cardPopup.querySelector('.popup__text--time');
  const cardFeatures = cardPopup.querySelector('.popup__features');
  const cardDescription = cardPopup.querySelector('.popup__description');
  const cardPhotos = cardPopup.querySelector('.popup__photos');
  const cardAvatar = cardPopup.querySelector('.popup__avatar');

  cardTitle.textContent = object.offer.title;
  cardAddress.textContent = object.offer.address;
  cardPrice.textContent = `${object.offer.price} ₽/ночь`;
  cardHousingType.textContent = HOUSE_TYPE[object.offer.type];
  cardGuestsAndRooms.textContent =
  `${object.offer.rooms} ${declOfNumRoom(object.offer.rooms, ROOM_TEXT_FORMS)} для ${object.offer.guests} ${declOfNumGuest(object.offer.guests, GUEST_TEXT_FORMS)}`;
  cardCheckinCheckout.textContent =
  `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  cardFeatures.appendChild(renderCardFeatures(object.offer.features, cardFeatures));
  cardDescription.textContent = object.offer.description;
  cardPhotos.appendChild(renderCardPhoto(object.offer.photos, cardPhotos));
  cardAvatar.src = object.author.avatar;

  return cardPopup;
};

ads.map((ad) => createCard(ad));

export {createCard};
