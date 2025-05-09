import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';

export default (isDark) => {
    const colors = isDark ? darkColors : lightColors;

    return StyleSheet.create({
        container: {
            padding: 20,
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
            color: colors.text,
        },
        grid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        card: {
            width: '48%',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 15,
            backgroundColor: colors.backgroundSecondary,

            // iOS shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,

            // Android shadow
            elevation: 5,
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
            fontSize: 20,
            fontWeight: '600',
            color: 'white',
            marginTop: 5,
        },
    });
};
