import { StyleSheet } from 'react-native';
import AppStyles from '../../styles/AppStyles';

const styles = StyleSheet.create({
  add: {
    backgroundColor: '#ffffff',
    color: '#00A6B8',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    height: 40,
  },
  title: {
    color: AppStyles.secondary.backgroundColor, // Color del texto
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  subtitle: {
    color: AppStyles.secondary.backgroundColor,
    fontSize: 16,
  },
  select: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  }

});

export default styles;
