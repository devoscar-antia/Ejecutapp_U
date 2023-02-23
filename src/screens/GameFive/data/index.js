import Sound from 'react-native-sound';

const pathAudios =
  '../../../../android/app/src/main/res/Game_Five/audios/audios_game';

const handleError = error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
};

export const audios = {
  0: new Sound(require(`${pathAudios}/0.mp3`), Sound.MAIN_BUNDLE, handleError),
  1: new Sound(require(`${pathAudios}/1.mp3`), Sound.MAIN_BUNDLE, handleError),
  2: new Sound(require(`${pathAudios}/2.mp3`), Sound.MAIN_BUNDLE, handleError),
  3: new Sound(require(`${pathAudios}/3.mp3`), Sound.MAIN_BUNDLE, handleError),
  4: new Sound(require(`${pathAudios}/4.mp3`), Sound.MAIN_BUNDLE, handleError),
  5: new Sound(require(`${pathAudios}/5.mp3`), Sound.MAIN_BUNDLE, handleError),
  6: new Sound(require(`${pathAudios}/6.mp3`), Sound.MAIN_BUNDLE, handleError),
  7: new Sound(require(`${pathAudios}/7.mp3`), Sound.MAIN_BUNDLE, handleError),
  8: new Sound(require(`${pathAudios}/8.mp3`), Sound.MAIN_BUNDLE, handleError),
  9: new Sound(require(`${pathAudios}/9.mp3`), Sound.MAIN_BUNDLE, handleError),
};

const playAudioAwait = numberAudio => {
  return new Promise(function(resolve) {
    audios[numberAudio].play(() => resolve(true)); // # Espera a que finalice un audio y revuelve la promesa
  });
};

class AudioLevel {
  constructor(firstChance, secondChance, practice) {
    this.firstChance = firstChance;
    this.secondChance = secondChance;
    this.practice = practice;

    this.startAudioGame = subLevel => {
      console.log('SubNivel: ' + subLevel);

      const audioLevel = subLevel == 0 ? this.firstChance : this.secondChance;

      console.log(audioLevel);

      return new Promise(async function(resolve) {
        for (let numberAudio of audioLevel) {
          await playAudioAwait(numberAudio);
        }
        resolve(true);
      });
    };
  }
}

//niveles de la forma directa

export const directLevels = {
  0: new AudioLevel([1, 6], [], 'PRACTICE'),
  1: new AudioLevel([7, 2], [5, 1]),
  2: new AudioLevel([4, 3, 7], [5, 8, 3]),
  3: new AudioLevel([9, 6, 0, 3], [9, 5, 4, 3]),
  4: new AudioLevel([3, 1, 4, 9, 5], [8, 9, 2, 7, 1]),
  5: new AudioLevel([6, 0, 9, 4, 3, 5], [9, 4, 0, 5, 2, 8]),
  6: new AudioLevel([2, 4, 1, 3, 8, 6, 0], [9, 5, 4, 3, 0, 1, 2]),
  7: new AudioLevel([0, 6, 3, 8, 1, 2, 5, 9], [9, 6, 7, 3, 5, 2, 0, 4]),
  8: new AudioLevel([8, 9, 0, 6, 5, 7, 4, 1, 2], [2, 6, 5, 4, 1, 3, 7, 0, 8]),
  9: new AudioLevel(
    [3, 0, 7, 1, 8, 2, 6, 5, 4, 9],
    [0, 4, 1, 3, 8, 6, 5, 2, 9, 7],
  ),
};
// niveles de la forma inversa

export const inverseLevels = {
  0: new AudioLevel([1, 3], [4, 2], 'PRACTICE'),
  1: new AudioLevel([9, 3, 5], [2, 4, 9]),
  2: new AudioLevel([1, 5, 0, 3], [5, 7, 2, 9]),
  3: new AudioLevel([3, 6, 7, 1], [4, 6, 2, 7]),
  4: new AudioLevel([9, 6, 4, 5, 3], [7, 9, 1, 8, 2]),
  5: new AudioLevel([9, 0, 2, 4, 7, 1], [3, 0, 5, 9, 2, 4]),
  6: new AudioLevel([0, 6, 3, 1, 9, 8, 4], [1, 5, 7, 9, 4, 2, 6]),
  7: new AudioLevel([2, 6, 4, 1, 9, 0, 5, 3], [5, 8, 4, 9, 1, 3, 0, 7]),
  8: new AudioLevel([9, 0, 2, 4, 6, 1, 3, 5, 7], [2, 1, 4, 8, 0, 9, 3, 6, 7]),
  9: new AudioLevel(
    [5, 1, 3, 6, 8, 7, 9, 0, 2, 4],
    [4, 3, 7, 9, 7, 2, 0, 8, 1, 5],
  ),
};
