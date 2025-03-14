import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './SavingsCards.styles';
import CardItem from './Card/CardItem';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';

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
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

export default SavingsCards;
