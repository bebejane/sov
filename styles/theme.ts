import Font from './font';
import { Dimensions } from 'react-native';
const { width, height, scale } = Dimensions.get('screen');

const themeVars = {
  color: {
    black: '#000000',
    white: '#FFFFFF',
    grey: '#ededed',
    greyDark: '#333333',
    error: '#8a0a01',
    green: '#015154',
    lightGreen: '#01515415',
  },
  fontSize: {
    default: 15,
    small: 12,
    medium: 13,
    large: 20,
  },
  lineHeight: {
    default: 30,
  },
  padding: 20,
  margin: 25,
  borderWidth: 1,
  borderRadius: 6,
  animationSpeed: 350,
  screenWidth: width,
  screenHeight: height,
  screenScale: scale,
};

const Theme = {
  ...themeVars,
  font: { ...Font },
};

export default Theme;
