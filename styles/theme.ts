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
    green: 'green'
  },
  fontSize: {
    default: 14,
    small: 12,
    medium: 16,
    large: 20,
  },
  padding: 20,
  margin: 20,
  borderWidth: 1,
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

