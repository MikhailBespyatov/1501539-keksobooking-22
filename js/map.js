/* global L:readonly */
/* global _:readonly */
import { createCard } from './create-card.js';
import { setActiveState } from './active-state.js';
import { getData, DATA_URL } from './api.js';
import { showAlert } from './util.js';
import { checkHouseType, checkPrice, checkRooms, changeElement, checkGuests, checkFeatures } from './filter.js';

const CENTER_COORDINATES = {
  lat: 35.65500,
  lng: 139.75000,
};
const DEBOUNSE_DELAY = 500;
const address = document.querySelector('#address');
const layerGroup = L.layerGroup();

const createMarkers = (cards) => {
  cards
    .slice()
    .filter((el) => checkHouseType(el))
    .filter((el) => checkPrice(el))
    .filter((el) => checkRooms(el))
    .filter((el) => checkGuests(el))
    .filter((el) => checkFeatures(el))
    .slice(0, 10)
    .forEach((el) => {
      createMarker(el);
    });

};

const getError = () => {
  showAlert('Проблемы с соединением, попробуйте позже');
};

const createMarker = (array) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const marker = new L.marker(
    {
      lat: array.location.lat,
      lng: array.location.lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(layerGroup)
    .bindPopup(
      createCard(array),
      {
        keepInView: true,
      });

  layerGroup.addTo(map);
};

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
    getData(
      DATA_URL,
      (cards) => {
        createMarkers(cards);
        changeElement(_.debounce(() => {
          layerGroup.clearLayers();
          createMarkers(cards);
        }, DEBOUNSE_DELAY));
      },
      getError,
    );
  })
  .setView(CENTER_COORDINATES, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  CENTER_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

map.on('click', (evt) => {
  mainPinMarker.setLatLng(evt.latlng);
  map.setView(evt.latlng);
  address.value =
    `${evt.latlng.lat.toFixed(5)}, ${evt.latlng.lng.toFixed(5)}`;
});

mainPinMarker.on('moveend', (evt) => {
  map.setView(evt.target.getLatLng());
  address.value =
    `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

address.setAttribute('readonly', 'readonly');
address.value =
  `${CENTER_COORDINATES.lat.toFixed(5)}, ${CENTER_COORDINATES.lng.toFixed(5)}`;


export { CENTER_COORDINATES, address, getError, mainPinMarker }
