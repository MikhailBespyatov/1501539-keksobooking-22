const getRandomNumber = (min = 0, max = 1) => {
  if (min >= 0 && max >= 0) {
    return (min >= max) ? Math.round(Math.random() * (min - max) + max) : Math.round(Math.random() * (max - min) + min);
  }
}



const getRandomFractionalNumber = (min = 0, max = 1, numbersAfterPoint) => {
  if (min >= 0 && max >= 0 && numbersAfterPoint >= 0) {
    return (min >= max) ? parseFloat((Math.random() * (min - max) + max).toFixed(numbersAfterPoint)) : parseFloat((Math.random() * (max - min) + min).toFixed(numbersAfterPoint));
  }
};

getRandomNumber();
getRandomFractionalNumber();
