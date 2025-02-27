import { StyleSheet } from 'react-native';
import AppStyles from '../../styles/AppStyles';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 1,
    backgroundColor: '#fff',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppStyles.primary.backgroundColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  tableWrapper: {
    justifyContent: 'center',
    width: '100%',
    marginBottom: 25,
  },
  table: {
    minWidth: 300,
    width: '95%',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    paddingVertical: 4,
    paddingLeft: 5,
  },
  negative: {
    backgroundColor: '#f0c8a5',
  },
  positive: {
    backgroundColor: '#d0eaff',
  },
  noExpenses: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
  }, checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 15,
    borderRadius: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    color: AppStyles.secondary.backgroundColor,
  }
});

export default styles;
