import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';
import { Dimensions } from 'react-native';


export default (isDark) => {

    const colors = isDark ? darkColors : lightColors;
    const { height } = Dimensions.get('window');

    return StyleSheet.create({

        container: {
            flex: 1,
        },
        transactionsPageContent: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 30,
            backgroundColor: colors.tertiary,  
            height: height*1.3,
        },
        transactionsPageData: {
            marginTop: 70,
            backgroundColor: colors.four,  
            borderRadius: 10,
            marginBottom: 10,
        }

    });
}