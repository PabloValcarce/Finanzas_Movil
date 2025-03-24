import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15
    },
    card: {
        width: '90%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: 'white'
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginTop: 5
    },
    containerMontly:{
        marginTop: 50,
    }

});

export default styles;
