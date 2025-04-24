import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext'; 
import styles  from './Settings.styles';  
import NavBarTransaction from '../../components/NavBarTransaction/NavBarTransaction';
import ThemeToggle from '../../components/Settings/ThemeToggle/ThemeToggle';
import useSettings from './SettingsLogic';

const SettingsScreen = () => {
    const { handleLogout } = useSettings();
    const { isDark } = useTheme();  
    const dynamicStyles = styles(isDark);

    return (
        <ScrollView style={dynamicStyles.SettingsPage}>
            <NavBarTransaction />
            <View style={dynamicStyles.SettingsPageContent}>
                <View style={dynamicStyles.preferences}>
                    <Text style={dynamicStyles.sectionTitle}>Preferencias</Text>
                    <ThemeToggle />
                </View>
                <View style={dynamicStyles.information}>
                    <Text style={dynamicStyles.sectionTitle}>Información</Text>
                    <TouchableOpacity style={dynamicStyles.item}>
                        <Text style={dynamicStyles.itemText}>Política de privacidad</Text>
                    </TouchableOpacity>
                </View>
                <View style={dynamicStyles.account}>
                    <Text style={dynamicStyles.sectionTitle}>Cuenta</Text>
                    <TouchableOpacity style={dynamicStyles.item} onPress={handleLogout}>
                        <Text style={dynamicStyles.itemText}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default SettingsScreen;
