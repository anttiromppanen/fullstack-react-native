import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    errorColor: '#d73a4a',
    appBackgroundColor: 'lightgrey',
    appBarBackground: 'black',
    appBarPrimaryTextColor: 'white',
    repositoryItemBackgroundColor: 'white',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    appBarTextSize: 24,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  borderRadius: {
    round: 10,
    semiRound: 5,
  },
};

export default theme;