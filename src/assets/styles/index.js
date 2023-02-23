import {Dimensions} from 'react-native';

/* Colors */
export const PURPLE_COLOR = '#490091';
export const PURPLE_SECONDARY_COLOR = '#690098';
export var BACKGROUND_COLOR = '#F5F5FD';
export const LIGHT_BACKGROUND_COLOR = '#7962BD';
export const LIGHT_BLUE_COLOR = '#3491CB';
export const LIGHT_GREEN_COLOR = '#6DD976';
export const LIGHT_YELLOW_COLOR = '#F8C909';
export const DARK_BLUE_COLOR = '#2A3551';
export const DARK_FONT_COLOR = '#014C7A';
export const BROWN_COLOR = '#342B2B';
export const RED_COLOR = '#DD234C';
export const DARK_PINK_COLOR = '#7C4A67';
export const WHITE = '#FFFFFF';
export const GRAY = '#343434';
export const LIGHT_GRAY = '#8E8E8E';
export const WHITE_COLOR = '#F5F5FD';

/* Fonts */

/* Muli */
export const MULI_LIGHT = 'Muli-Light';
export const MULI_REGULAR = 'Muli-Regular';
export const MULI_MEDIUM = 'Muli-Medium';
export const MULI_BOLD = 'Muli-Bold';
export const MULI_EXTRA_BOLD = 'Muli-ExtraBold';
export const MULI_BLACK = 'Muli-Black';
/* Cocogoose */
export const COCO_THIN = 'Cocogoose-Thin';
export const COCO_LIGHT = 'Cocogoose-Ultralight';
export const COCO_REGULAR = 'Cocogoose-Light';
export const COCO_BOLD = 'Cocogoose';

/* Screen Sizes */
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

/* Screen Medias */
export const TABLET = 768;
export const MOBILE = 500;

/* Shadows */
export const SHADOWS = {
  normal: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 10,
  },
  light: {
    shadowColor: '#EEE',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
  },
  ultralight: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,
    elevation: 7,
  },
  thin: {
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 10,
  },
};
