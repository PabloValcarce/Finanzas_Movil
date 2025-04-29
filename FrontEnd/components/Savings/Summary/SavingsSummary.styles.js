import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';

export default (isDark) => {
    const colors = isDark ? darkColors : lightColors;


    return StyleSheet.create({
        container: {
            padding: 20,
            alignItems: 'center'
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 15,
            color: colors.text, 
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
        cardPositive: {
            backgroundColor: colors.positive,
        },
        cardNegative: {
            backgroundColor: colors.negative,
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 5,
            color: colors.text,
        },
        value: {
            fontSize: 18,
            fontWeight: '600',
            color: 'white',
            marginTop: 5
        },
        containerMontly: {
            marginTop: 50,
        }

    });
}
