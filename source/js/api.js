const DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SERVER_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = (url, onSuccess, onError) => {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}`);
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onError(err);
    });
}

const sendData = (onSuccess, onError, url, body) => {
  return fetch(url, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    })
};

export { getData, DATA_URL, sendData, SERVER_URL };
