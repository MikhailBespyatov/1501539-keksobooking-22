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

export {getRandomNumber, getRandomFractionalNumber, getRandomItem, getRandomArray, shuffle};
