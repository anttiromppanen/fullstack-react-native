import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#A8AABC',
    primary: '#00BB82',
    yellow: '#FFC25E',
    lightBrown: '#B6A999',
    errorColor: '#C2554F',
    lowReviewScoreRed: '#FF734D',
    appBackgroundColor: 'lightgrey',
    appBarBackground: '#504538',
    appBarPrimaryTextColor: 'white',
    repositoryItemBackgroundColor: 'white',
  },
  fontSizes: {
    body: 14,
    heading: 45,
    subheading: 16,
    appBarTextSize: 16,
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
    round: 20,
    semiRound: 20,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
  },
  formStyle: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: '100%',
    padding: 10,
  },
  formHeadingText: {
    color: '#504538',
    marginBottom: 10,
    alignSelf: 'center',
  },
  formSubmitButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#00BB82',
    borderRadius: 20,
  },
  formSubmitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  formTextInput: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderColor: 'lightgrey',
    borderWidth: 1,
    flex: 1,
    flexBasis: '90%',
    margin: 5,
    padding: 10,
    borderStyle: 'solid',
    borderRadius: 20,
    fontSize: 18,
  },
  formIcon: {
    color: '#504538',
    marginHorizontal: 5,
  },
};

export default theme;