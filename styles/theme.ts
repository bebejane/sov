import Font from './font';
import { Dimensions } from 'react-native';
const { width, height, scale } = Dimensions.get('screen');

// Multiplicator för line-height baserat på font-size
const lineHeightMultiplier = 2;

const themeVars = {
  color: {
    black: '#000000',
    white: '#FFFFFF',
    grey: '#ededed',
    greyDark: '#333333',
    error: '#8a0a01',
    green: '#015154',
  },
  fontSize: {
    default: 15,
    small: 12,
    medium: 13,
    large: 20,
  },
  lineHeight: {
    default: 25,
    small: Math.round(12 * lineHeightMultiplier),  // 12px font-size * 1.5 = 18px
    medium: Math.round(13 * lineHeightMultiplier), // 13px font-size * 1.5 = 20px
    large: Math.round(20 * lineHeightMultiplier),  // 20px font-size * 1.5 = 30px
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
