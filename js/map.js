import { createAds, NUMBERS_ADS_ARRAY } from './create-ads.js';
import { createCard } from './create-card.js';
import { getActiveState } from './active-state.js';

const ads = createAds(NUMBERS_ADS_ARRAY);
const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    getActiveState();
  })
  .setView({
    lat: 35.65500,
    lng: 139.75000,
  }, 12);

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
  {
    lat: map._lastCenter.lat,
    lng: map._lastCenter.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

map.on('click', (evt) => {
  mainPinMarker.setLatLng(evt.latlng);
  map.setView(evt.latlng);
});

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  map.setView(coordinates);
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
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
  `${mainPinMarker._latlng.lat.toFixed(5)}, ${mainPinMarker._latlng.lng.toFixed(5)}`;

