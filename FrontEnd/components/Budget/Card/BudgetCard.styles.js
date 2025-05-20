import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';


export default (isDark) => {
    const colors = isDark ? darkColors : lightColors;

    return StyleSheet.create({
        card: {
            backgroundColor: colors.budgetCard.backgroundColor,
            borderRadius: 8,
            padding: 15,
            marginVertical: 8,
            marginHorizontal: 16,
            shadowColor: colors.budgetCard.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        budgetName: {
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
        },
        budgetAmount: {
            fontSize: 16,
            fontWeight: '500',
            color: colors.budgetCard.amount,
        },
        details: {
            marginTop: 10,
            borderTopWidth: 1,
            borderTopColor: colors.text,
            paddingTop: 10,
        },
        detailText: {
            fontSize: 14,
            color: colors.text,
            marginBottom: 5,
        },
           
    });
}
