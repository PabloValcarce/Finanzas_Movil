import { StyleSheet, Dimensions } from 'react-native';
import AppStyles from '../../../styles/AppStyles';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    SettingsPage: {
        flex: 1, 
        padding: 30,
        margin: 20,
        marginTop: 110,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'column',
        height: height * 0.87,
    },
    CategoriesPerso: {
        flex: 1,
        width: '95%',
        flexDirection: 'column',
        gap: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: AppStyles.primary.backgroundColor,
    },

    add: {
        flexDirection: 'row',
    },
    input: {
        width: '70%',
        borderWidth: 1.5,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    listContainer: {
        height: 300,  
    },
    
    addCategoryButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: '#f0f0f0',
        color: AppStyles.primary.backgroundColor,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        height: 40,
    },
    categoryItem: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 10,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    deleteIcon: {
        padding: 6, 
        borderRadius: 8, 
        backgroundColor: '#e74c3c', 
    },
    iconButton: {
        padding: 10,
    },
});
