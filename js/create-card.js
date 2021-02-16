import { createAds} from './create-ads.js';

const ads = createAds(10);

//контейнер для объявления
const cardsContainer = document.querySelector('#map-canvas');

//ссылка на шаблон
const cardTemplate = document.querySelector('#card').content;

const createCard = (obj) => {

  //контент шаблона
  const cardPopup = cardTemplate.querySelector('.popup');

  //заголовок
  const cardTitle = cardTemplate.querySelector('.popup__title');
  cardTitle.textContent = obj.offer.title;

  //адрес
  const cardAddress = cardTemplate.querySelector('.popup__text--address');
  cardAddress.textContent = obj.offer.address;

  //цена
  const cardPrice = cardTemplate.querySelector('.popup__text--price');
  cardPrice.textContent = `${obj.offer.price} ₽/ночь`;

  //тип жилья
  const cardHousingType = cardTemplate.querySelector('.popup__type');
  const dictionary = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  }
  cardHousingType.textContent = dictionary[obj.offer.type];

  //Количество гостей и комнат
  const cardGuestsAndRooms = cardTemplate.querySelector('.popup__text--capacity');
  cardGuestsAndRooms.textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;

  //время заезда и выезда
  const cardCheckinCheckout = cardTemplate.querySelector('.popup__text--time');
  cardCheckinCheckout.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;

  //удобства
  const cardFeatures = cardTemplate.querySelector('.popup__features');
  const featuresContent = obj.offer.features;

  const renderCardFeatures = (Array, block) => {
    const fragment = document.createDocumentFragment();
    block.innerHTML = '';

    for (let i = 0; i < Array.length; i++) {
      const cardFeatureItem = document.createElement('li');
      cardFeatureItem.classList.add('popup__feature', `popup__feature--${Array[i]}`);
      fragment.appendChild(cardFeatureItem)
    }

    return fragment;
  };

  cardFeatures.appendChild(renderCardFeatures(featuresContent, cardFeatures));

  //Описание
  const cardDescription = cardTemplate.querySelector('.popup__description');
  cardDescription.textContent = obj.offer.description;

  //фото объявления
  const cardPhotos = cardTemplate.querySelector('.popup__photos');
  const cardPhotosContent = obj.offer.photos;

  const renderCardPhoto = (Array, block) => {
    const fragment = document.createDocumentFragment();
    block.innerHTML = '';

    for (let i = 0; i < Array.length; i++) {
      const cardPhotosItem = document.createElement('img');
      cardPhotosItem.classList.add('popup__photo');
      cardPhotosItem.src = Array[i];
      cardPhotosItem.alt = 'Фотография жилья';
      cardPhotosItem.width = 45;
      fragment.appendChild(cardPhotosItem)
    }

    return fragment;
  };

  cardPhotos.appendChild(renderCardPhoto(cardPhotosContent, cardPhotos))

  //аватарка
  const cardAvatar = cardTemplate.querySelector('.popup__avatar');
  cardAvatar.src = obj.author.avatar;

  return cardPopup;
};

cardsContainer.appendChild(createCard(ads[0]));
