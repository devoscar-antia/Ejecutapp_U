import React, {useContext, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import {Button, Option} from '../../components';
import {
  WHITE_COLOR,
  MULI_BLACK,
  MULI_REGULAR,
  PURPLE_COLOR,
  SHADOWS,
  GRAY,
  COCO_BOLD,
  MULI_MEDIUM,
} from '../../assets/styles';

import {LayoutContext} from '../../context/LayoutContext';
import {TopHeader} from '../../components/TopHeader';
import Sound from 'react-native-sound';

const GameInstructionsContent = ({
  orientation,
  game,
  isMobile,
  onNextStageHandler,
  stage,
  playInstructions,
  pauseInstructions,
  repeatInstructions,
}) => {
  return (
    <View
      style={{
        ...styles.gameInstructionsCardContainer,
        height: orientation.width * (isMobile ? 0.9 : 0.475),
      }}>
      {!isMobile && (
        <Text style={styles.gameInstructionsTitle}>{game.title}</Text>
      )}
      <View
        style={
          isMobile
            ? styles.gameInstructionsRowMobile
            : styles.gameInstructionsRow
        }>
        <Image
          style={
            isMobile
              ? styles.gameInstructionsCardImageMobile
              : styles.gameInstructionsCardImage
          }
          source={game.gif}
        />
        <Text
          style={
            isMobile
              ? {
                  ...styles.gameInstructionsDescriptionMobile,
                  fontSize: orientation.width * 0.025,
                }
              : {
                  ...styles.gameInstructionsDescription,
                  fontSize: orientation.width * 0.0175,
                }
          }>
          {game[`${stage}Description`]}
        </Text>

        <View
          style={
            isMobile
              ? styles.gameInstructionsAudioContainerMobile
              : styles.gameInstructionsAudioContainer
          }>
          <Option
            icon={'play'}
            onPress={() => playInstructions()}
            size={orientation.width * (isMobile ? 0.025 : 0.015)}
            backgroundColor={WHITE_COLOR}
            color={PURPLE_COLOR}
            thin={false}
            text={'ESCUCHAR'}
            customStyles={
              isMobile
                ? styles.optionCustomStylesMobile
                : styles.optionCustomStyles
            }
            fontSize={orientation.width * (isMobile ? 0.01875 : 0.015)}
          />
          <Option
            icon={'pause'}
            onPress={() => pauseInstructions()}
            size={orientation.width * (isMobile ? 0.025 : 0.015)}
            backgroundColor={WHITE_COLOR}
            color={PURPLE_COLOR}
            thin={false}
            text={'PAUSAR'}
            customStyles={
              isMobile
                ? styles.optionCustomStylesMobile
                : styles.optionCustomStyles
            }
            fontSize={orientation.width * (isMobile ? 0.0215 : 0.015)}
          />
          <Option
            icon={'repeat'}
            onPress={() => repeatInstructions()}
            size={orientation.width * (isMobile ? 0.025 : 0.015)}
            backgroundColor={WHITE_COLOR}
            color={PURPLE_COLOR}
            thin={false}
            text={'REPETIR'}
            customStyles={
              isMobile
                ? styles.optionCustomStylesMobile
                : styles.optionCustomStyles
            }
            fontSize={orientation.width * (isMobile ? 0.0215 : 0.015)}
          />
          {!isMobile ? (
            <Option
              backgroundColor={PURPLE_COLOR}
              color={WHITE_COLOR}
              size={orientation.width * (isMobile ? 0.0175 : 0.015)}
              text={'EMPEZAR'}
              onPress={onNextStageHandler}
              fontSize={orientation.width * (isMobile ? 0.0175 : 0.015)}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

const GameInstructions = ({game, onNextStageHandler, stage}) => {
  const {orientation, isMobile} = useContext(LayoutContext);

  let instructionsAudio = useRef(null);

  useEffect(() => {
    return () => {
      if (instructionsAudio.current) {
        instructionsAudio.current.stop();
      }
    };
  }, []);

  const playInstructions = async () => {
    if (!game.audio) return;
    if (instructionsAudio.current) {
      instructionsAudio.current.play();
      return;
    }
    instructionsAudio.current = new Sound(
      game.audio,
      Sound.MAIN_BUNDLE,
      error => {
        if (error) return;
        instructionsAudio.current.play();
      },
    );
  };

  const pauseInstructions = async () => {
    if (instructionsAudio.current) {
      instructionsAudio.current.pause();
    }
  };

  const repeatInstructions = async () => {
    if (!game.audio) return;
    if (instructionsAudio.current) {
      instructionsAudio.current.stop();
    }
    instructionsAudio.current = new Sound(
      game.audio,
      Sound.MAIN_BUNDLE,
      error => {
        if (error) return;
        instructionsAudio.current.play();
      },
    );
  };

  return (
    <ScrollView
      style={{...styles.gameInstructionsContainer, height: orientation.width}}>
      <TopHeader orientation={orientation} type={'game'} />
      <ScrollView
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        style={{
          ...styles.gameInstructionsContentContainer,
          height: isMobile
            ? orientation.width * 1.75
            : orientation.width * 0.75,
        }}>
        <GameInstructionsContent
          game={game}
          isMobile={isMobile}
          onNextStageHandler={onNextStageHandler}
          orientation={orientation}
          stage={stage}
          playInstructions={playInstructions}
          pauseInstructions={pauseInstructions}
          repeatInstructions={repeatInstructions}
        />
        {isMobile ? (
          <Button
            onPress={onNextStageHandler}
            text={`EMPEZAR`}
            backgroundColor={PURPLE_COLOR}
            fontColor={WHITE_COLOR}
            marginForText={45}
            width={'70%'}
            marginVertical={30}
            marginBottom={25}
            customStyles={{fontWeight: 'thin'}}
          />
        ) : null}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gameInstructionsContainer: {
    backgroundColor: WHITE_COLOR,
    width: '100%',
    height: 'auto',
    display: 'flex',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  gameInstructionsContentContainer: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    paddingVertical: 30,
  },
  gameInstructionsCardContainer: {
    width: '80%',
    height: 'auto',
    borderColor: GRAY,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    ...SHADOWS.ultralight,
    padding: 30,
    marginTop: 150,
  },
  gameInstructionsRow: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gameInstructionsRowMobile: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  gameInstructionsCardImage: {
    width: '40%',
    height: '100%',
    maxHeight: '70%',
  },
  gameInstructionsCardImageMobile: {
    width: '100%',
    height: '60%',
  },
  gameInstructionsTitle: {
    color: PURPLE_COLOR,
    fontFamily: COCO_BOLD,
    fontSize: 25,
    textAlign: 'justify',
    marginVertical: 10,
  },
  gameInstructionsDescription: {
    fontFamily: MULI_MEDIUM,
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 35,
    height: 'auto',
    textAlign: 'justify',
    width: '60%',
  },
  gameInstructionsDescriptionMobile: {
    fontFamily: MULI_MEDIUM,
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  gameInstructionsAudioContainer: {
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  gameInstructionsAudioContainerMobile: {
    width: '100%',
    height: '20%',
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  optionStartGame: {
    marginTop: 30,
    width: '80%',
  },
  optionCustomStylesMobile: {
    width: '30%',
  },
  headerText: {
    color: PURPLE_COLOR,
    fontFamily: MULI_BLACK,
    fontSize: 48,
  },
  instructionWrapper: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 71,
  },
  indicationWrapper: width => ({
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  indicationText: {
    fontFamily: MULI_REGULAR,
    fontSize: 18,
  },
});

export default GameInstructions;
