import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../../styles/colors';

export const styles = (isDark) => {
    const colors = isDark ? darkColors : lightColors;

    return StyleSheet.create({

        container: {
            alignItems: 'center',
            marginVertical: 20,
        },
        chartTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.text,  // Color de texto dependiendo del modo
        },
        chartTitleColor: {
            color: colors.text,  // Color de texto dependiendo del modo
        }
    })
}
