import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0eaff',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 16,
  },
  contentContainer: {
    paddingHorizontal:10,
  },
});

export default styles;
