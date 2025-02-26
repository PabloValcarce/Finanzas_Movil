import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  spentPage: {
    padding: 20,
    flex: 1,
  },
  spentContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    color: 'black', // Puedes usar un color personalizado
  },
  dateFilter: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 100,
    marginBottom:30,
    zIndex: 10,
  },
  spentData: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 50,
  },
  spentGraphs: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  spentList: {
    backgroundColor: 'white',
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 10
  },
});

export default styles;
