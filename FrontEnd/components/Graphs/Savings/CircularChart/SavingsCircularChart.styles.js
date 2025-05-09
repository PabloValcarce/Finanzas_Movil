import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../../styles/colors';

export const styles = (isDark) => {
    const colors = isDark ? darkColors : lightColors;

    return StyleSheet.create({

        container: {
            height: 270,
            alignItems: 'center',
        },
        chartTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.text,
            marginTop: -10,
        },
        chartTitleColor: {
            color: isDark ? '#ffffff' : '#000000',
          },
        savingsCircularChart: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginRight: 20,
        },
        chartTitleColor: {
            color: colors.text,
        },
        legend:{
            marginLeft: 20,
        },
        legendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          },
          legendDot: {
            width: 12,
            height: 12,
            borderRadius: 6,
            marginRight: 8,
          },
          legendLabel: {
            color: isDark ? '#ffffff' : '#000000',
          },
          explanationText: {
            marginTop: 20,
            textAlign: 'center',
            fontSize: 14,
            color: isDark ? '#ffffff' : '#000000',
          },
    })
}
