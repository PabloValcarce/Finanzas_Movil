import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './ThemeToggle.styles';  

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const dynamicStyles = styles(isDark);  
  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.label}>Modo oscuro</Text>
      <Switch style={dynamicStyles.Switch} value={isDark} onValueChange={toggleTheme} />
    </View>
  );
}
