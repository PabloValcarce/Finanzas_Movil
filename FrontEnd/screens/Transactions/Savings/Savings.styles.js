import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  savingsPage: {
    flex: 1,
  },
  savingsPageContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding:30,

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
    marginTop: 30,
    marginBottom: 10,
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
  },

  
});
