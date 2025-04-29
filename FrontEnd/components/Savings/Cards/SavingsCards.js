import React from 'react';
import { View, Text } from 'react-native';
import styles from './SavingsCards.styles';
import {useTheme} from '../../../context/ThemeContext';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import CardItem from '../Cards/Card/CardItem'


const { width } = Dimensions.get('screen');

function SavingsCards({ monthlySavings }){
    const scrollX = useSharedValue(0); 
    const { isDark } = useTheme();
    const dynamicStyles = styles(isDark);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    });
    
    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>Historial de Ahorro Mensual</Text>
            <Animated.FlatList
                data={monthlySavings}
                keyExtractor={(item) => item.month}
                renderItem={({ item, index }) => {
                    return <CardItem month={item} index={index} scrollX={scrollX} />;
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={onScrollHandler}
                scrollEventThrottle={16}
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                windowSize={6}
                getItemLayout={(data, index) => ({
                    length: width,
                    offset: width * index,
                    index
                })}
                contentContainerStyle={{ width: monthlySavings.length * width }}
                snapToAlignment="center"
                decelerationRate={'fast'}
            />
        </View>
    );
}
export default SavingsCards;
