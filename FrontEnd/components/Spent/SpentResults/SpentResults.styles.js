import { StyleSheet } from 'react-native';
import AppStyles from '../../../styles/AppStyles';

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppStyles.primary.backgroundColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  tableWrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  table: {
    minWidth: 300,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.table.backgroundColor,
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.table.backgroundColor,
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    width:120,
    padding: 2,
  },
  noExpenses: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 15,
  },
});

export default styles;
