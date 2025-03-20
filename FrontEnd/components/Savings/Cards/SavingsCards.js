import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './SavingsCards.styles';
import CardItem from './Card/CardItem';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Dimensions } from 'react-native';


const { width } = Dimensions.get('screen');

const SavingsCards = ({ monthlySavings }) => {
    const scrollX = useSharedValue(0); // valor para controlar el scroll

    // Controlador del evento onScroll
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Ahorro Mensual</Text>
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
                initialNumToRender={6} // Renderiza solo 5 elementos al inicio
                maxToRenderPerBatch={6} // Número máximo de renders por lote
                windowSize={6} // Mantiene 5 elementos en memoria
                getItemLayout={(data, index) => ({
                    length: width, // Tamaño de cada item
                    offset: width * index,
                    index
                })}
                contentContainerStyle={{ width: monthlySavings.length * width }}
                snapToAlignment="center"
                decelerationRate={'fast'}
            />
        </View>
    );
};

export default SavingsCards;
