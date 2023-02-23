export const generateLevelsGameOne = levelsQuantity => {
  let levels = new Array();
  for (let i = 0; i < levelsQuantity; i++) {
    levels.push(getRandomNumberBetween(0, 1));
  }
  return levels;
};

export const getRandomNumberBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export function getSumatory(accumulated, item) {
  if (!item) {
    return 1 + accumulated;
  } else {
    return 0 + accumulated;
  }
}

export const handleSoundError = error => {
  if (error) {
    console.warn(error);
    return;
  }
};

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
