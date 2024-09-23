import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

export const CardStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.White,
    width: '94%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  content: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    // fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 12,
    color: Colors.SteelBlue,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
  },
});
