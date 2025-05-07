import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../../styles/colors';

export default (isDark) =>{
    const colors = isDark ? darkColors : lightColors;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            marginVertical: 20,
        },
        chartTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
            color: colors.text, 
        },
        axisColor:{
            color: colors.text, 
        },
        lineColor:{
            color: colors.graph.line, 
        },
        labelColor:{
            color: colors.text, 
        }
        
    });
}




