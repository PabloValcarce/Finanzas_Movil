// styles/TransactionsStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  head: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 100,
    marginBottom:30,
    zIndex: 10,
  },
  headDatePicker: {
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    color: 'black', // Puedes usar un color personalizado
  },
  headFilterAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  transactionsResults: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
