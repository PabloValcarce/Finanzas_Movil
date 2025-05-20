import { StyleSheet } from "react-native";
import { lightColors, darkColors } from "../../styles/colors";

export default (isDark) => {

    const colors = isDark ? darkColors : lightColors;

    return StyleSheet.create({
        
add: {
     backgroundColor: colors.background,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
      height: 40,
    },
    subtitle: {
      marginTop: 10,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#333',
    },
    select: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      backgroundColor: isDark ? '#222' : '#fff',
      color: isDark ? '#fff' : '#000',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    message: {
      marginVertical: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    success: {
      color: 'green',
    },
    error: {
      color: 'red',
    },






    });
};