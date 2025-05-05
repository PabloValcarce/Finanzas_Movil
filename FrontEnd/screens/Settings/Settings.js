import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';  // Importar el contexto
import styles from './Settings.styles';  
import NavBarTransaction from '../../components/NavBarTransaction/NavBarTransaction';
import ThemeToggle from '../../components/Settings/ThemeToggle/ThemeToggle';
import useSettings from './SettingsLogic';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
    const { handleLogout } = useSettings();
    const { isDark } = useTheme();  
    const dynamicStyles = styles(isDark);
    const { t } = useTranslation(); // Hook para traducción

    return (
        <ScrollView style={dynamicStyles.SettingsPage}>
            <NavBarTransaction />
            <View style={dynamicStyles.SettingsPageContent}>
                <View style={dynamicStyles.information}>
                    <Text style={dynamicStyles.sectionTitle}>{t('Settings.Information.title')}</Text>
                    <TouchableOpacity style={dynamicStyles.item}>
                        <Text style={dynamicStyles.itemText}>{t('Settings.Information.Privacy')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={dynamicStyles.preferences}>
                    <Text style={dynamicStyles.sectionTitle}>{t('Settings.Preferences.title')}</Text>
                    <ThemeToggle  />  
                </View>
                <View style={dynamicStyles.account}>
                    <Text style={dynamicStyles.sectionTitle}>{t('Settings.Account.title')}</Text>
                    <TouchableOpacity style={dynamicStyles.item} onPress={handleLogout}>
                        <Text style={dynamicStyles.itemText}>{t('Settings.Account.LogOut')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default SettingsScreen;
