import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './Settings.styles';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import ThemeToggle from '../../../components/Settings/ThemeToggle/ThemeToggle';
import useSettings from './SettingsLogic';
import { useTranslation } from 'react-i18next';
import i18n from '../../../assets/language/i18n'; // Asegúrate que la ruta sea correcta
import AsyncStorage from '@react-native-async-storage/async-storage';
import languageOptions from '../../../utils/languageOptions';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const { handleLogout } = useSettings();
    const { isDark } = useTheme();
    const dynamicStyles = styles(isDark);
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const languages = Object.keys(i18n.options.resources);
    const navigation = useNavigation();

    const availableLanguages = Object.keys(i18n.options.resources);

    const handleLanguageChange = async (lang) => {
        await i18n.changeLanguage(lang);
        await AsyncStorage.setItem('user-language', lang);
    };

    return (
        <ScrollView style={dynamicStyles.SettingsPage}>
            <NavBarTransaction />
            <View style={dynamicStyles.SettingsPageContent}>

                <View style={dynamicStyles.information}>
                    <Text style={dynamicStyles.sectionTitle} >{t('Settings.Information.title')}</Text>
                    <View style={dynamicStyles.informationContent}>
                        <TouchableOpacity style={dynamicStyles.item} onPress={() => navigation.navigate('AboutApp')}>
                            <Text style={dynamicStyles.itemText} >{t('Settings.Information.Information')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={dynamicStyles.item}>
                            <Text style={dynamicStyles.itemText}>{t('Settings.Information.Privacy')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={dynamicStyles.preferences}>
                    <Text style={dynamicStyles.sectionTitle}>{t('Settings.Preferences.title')}</Text>
                    <ThemeToggle />

                    {/* 🌍 Language Selector */}
                    <View style={dynamicStyles.languageSelector}>
                        <Text style={dynamicStyles.languageText}>{t('Settings.Preferences.Language')}</Text>
                        <TouchableOpacity style={dynamicStyles.languageTouchable} onPress={() => setModalVisible(true)}>
                            <Text style={dynamicStyles.itemFlag}>{languageOptions[i18n.language].flag}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={dynamicStyles.account}>
                    <Text style={dynamicStyles.sectionTitle}>{t('Settings.Account.title')}</Text>
                    <TouchableOpacity style={dynamicStyles.item} onPress={handleLogout}>
                        <Text style={dynamicStyles.itemText}>{t('Settings.Account.LogOut')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={dynamicStyles.modal}>
                    <View style={dynamicStyles.modalContent}>
                        <FlatList
                            data={languages}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={dynamicStyles.languageItem}
                                    onPress={() => {

                                        handleLanguageChange(item);
                                        setModalVisible(false);
                                    }}>
                                    <Text style={dynamicStyles.flagEmoji}>{languageOptions[item].flag}</Text>
                                    <Text style={dynamicStyles.languageLabel}>{t(languageOptions[item].labelKey)}</Text>

                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item}
                        />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default SettingsScreen;
