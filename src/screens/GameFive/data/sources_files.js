const root = '../../../../android/app/src/main/res/Game_Five';
const devRevDir = root + '/Dev_Rev/';
const gameDir = root + '/intro_game/';
const versionDir = root + '/versionDirecta/';
const audioPresDir = root + '/audios/audio_presentacion/';

const source = {
  img: {
    der_btn: require(`${devRevDir}Der_Btn.png`),
    btn_playblanco: require(`${gameDir}Btn_PlayBlanco.png`),
    btn_pausablanco: require(`${gameDir}Btn_PausaBlanco.png`),
    btn_replayblanco: require(`${gameDir}Btn_ReplayBlanco.png`),
    btn_empezar_v: require(`${gameDir}Btn_Empezar_V.png`),
    btnseguir_s: require(`${versionDir}BtnSeguir_S.png`),
  },
  audios: {
    presentacion: require(`${audioPresDir}vinci.mp3`),
  },
};

export default source;
