import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  savingsPage: {
    flex: 1,
    padding: 30,
  },
  savingsContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    color: 'black', 
  },
  dateFilter: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 100,
    zIndex: 10,
  },
  savingsData: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    marginTop: 30,
    marginBottom: 50,
  },
  savingsGraphs: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 100,
    marginTop: 40,
  },
  savingsLineChart: {
  },
  savingsCircularChart: {
    alignItems: 'center',
  }
});
