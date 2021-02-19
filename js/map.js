/* global L:readonly */

import { createAds, NUMBERS_ADS_ARRAY } from './create-ads.js';
import { createCard } from './create-card.js';
import { setActiveState } from './active-state.js';

const ads = createAds(NUMBERS_ADS_ARRAY);
const address = document.querySelector('#address');
const CENTER_COORDINATES = {
  lat: 35.65500,
  lng: 139.75000,
};

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView(CENTER_COORDINATES, 12);

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

const createMarker = (array) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const marker = L.marker(
    {
      lat: array.location.x,
      lng: array.location.y,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCard(array),
      {
        keepInView: true,
      });
};

for (let i = 0; i < ads.length; i++) {
  createMarker(ads[i])
}

address.setAttribute('readonly', 'readonly');
address.value =
  `${CENTER_COORDINATES.lat.toFixed(5)}, ${CENTER_COORDINATES.lng.toFixed(5)}`;

