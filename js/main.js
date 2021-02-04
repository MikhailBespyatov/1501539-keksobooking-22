const getRandomNumber = (min = 0, max = 1) => {
  if (min >= 0 && max >= 0) {
    if (min >= max) {
      return Math.round(Math.random() * (min - max) + max);
    }

    return Math.round(Math.random() * (max - min) + min);
  }
}

const getRandomFractionalNumber = (min = 0, max = 1, numbersAfterPoint) => {
  if (min >= 0 && max >= 0) {
    if (min >= max) {
      return parseFloat((Math.random() * (min - max) + max).toFixed(numbersAfterPoint));
    }

    return parseFloat((Math.random() * (max - min) + min).toFixed(numbersAfterPoint));
  }
};

getRandomNumber();
getRandomFractionalNumber();
