import Font from './font';
import { Dimensions } from 'react-native';
const { width, height, scale } = Dimensions.get('screen');

const themeVars = {
  color: {
    black: '#141414',
    white: '#ffffff',
    grey: '#ededed',
    greyDark: '#333333',
    error: '#8a0a01',
    green: '#015154',
    lightGreen: '#d3e6e3',
  },
  fontSize: {
    default: 16,
    small: 16,
    smaller: 12,
    medium: 17,
    large: 21,
  },
  lineHeight: {
    default: 21,
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
