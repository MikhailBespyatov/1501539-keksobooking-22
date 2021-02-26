const ALERT_SHOW_TIME = 3000;

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

const getRandomItem = (array) => array[getRandomNumber(0, array.length - 1)];

const getRandomArray = (array) => {
  const newArray = [];
  array.forEach((element) => {
    if (getRandomNumber(0, 1) === 1) {
      newArray.push(element);
    }
  })
  return newArray;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const showAlert = (message) => {
  const alertConteiner = document.createElement('div');
  alertConteiner.style.zIndex = 10;
  alertConteiner.style.position = 'absolute';
  alertConteiner.style.left = '20px';
  alertConteiner.style.top = '20px';
  alertConteiner.style.right = '20px';
  alertConteiner.style.padding = 0;
  alertConteiner.style.fontSize = '30px';
  alertConteiner.style.textAlign = 'center';
  alertConteiner.style.backgroundColor = 'green';
  alertConteiner.style.color = 'white';
  alertConteiner.textContent = message;

  document.body.append(alertConteiner);

  setTimeout(() => {
    alertConteiner.remove();
  }, ALERT_SHOW_TIME);
};

const closePopup = (popup, button) => {
  window.addEventListener('click', () => {
    popup.remove();
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      popup.remove();
    }
  });

  if (button) {
    button.addEventListener('click', () => {
      popup.remove();
    });
  }
};

export {getRandomNumber, getRandomFractionalNumber, getRandomItem, getRandomArray, shuffle, showAlert, closePopup};
