import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  datePickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    zIndex: 10,
    marginRight: 30,
    alignItems: 'center',
  },
  datePicker: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    height:30,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
  },
  resetButton: {
    padding: 5,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
