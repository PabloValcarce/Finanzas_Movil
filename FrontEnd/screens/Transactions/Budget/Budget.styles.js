import { StyleSheet, Dimensions } from "react-native";
import { lightColors, darkColors } from "../../../styles/colors";

const { height } = Dimensions.get('window');

export default (isDark) => {
    const colors = isDark ? darkColors : lightColors;

    return StyleSheet.create({
        budgetPage: {
            flex: 1,
        },
        budgetPageContent: {
            flexDirection: "column",
            padding: 30,
            marginVertical: 70,
            backgroundColor: colors.tertiary,
            height: height,
        },
        budgetData: {
            backgroundColor: colors.four,
            borderRadius: 10,
            marginVertical: 40,
            padding: 20,
        },
        headFilterAdd: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        NoBudgets: {
            color: colors.text,
            fontSize: 20,
            textAlign: 'center',
            marginVertical: 20,
        },
        
    });
}