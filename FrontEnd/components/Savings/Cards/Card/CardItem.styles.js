import { Dimensions, StyleSheet } from 'react-native';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({

    card:{
        justifyContent: 'center',
        alignItems:'center',
        width:width,
        margin:-9
    },
    cardBackground:{
        backgroundColor:'#d0eaff',
        height:300,
        width:300,
        margin:10,
        borderRadius:20,
        padding:30,
        marginBottom:20
        
    },
    cardLabel:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,

    }
});

export default styles;