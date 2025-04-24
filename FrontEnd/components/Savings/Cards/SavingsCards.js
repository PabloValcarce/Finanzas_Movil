import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './SavingsCards.styles';

import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const SavingsCards = ({ monthlySavings }) => {
    const scrollX = useSharedValue(0);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Ahorro Mensual</Text>
            {/* <Animated.FlatList
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
            /> */}
        </View>
    );
};

export default SavingsCards;
