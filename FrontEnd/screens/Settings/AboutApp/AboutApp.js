import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import styles from './AboutApp.styles'; // Reutilizamos los estilos
import { useTranslation } from 'react-i18next';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Asegúrate de importar esto si no lo has hecho ya

const AboutApp = () => {
    const { isDark } = useTheme();
    const dynamicStyles = styles(isDark);  // Usamos los estilos reutilizados
    const { t } = useTranslation();
    const navigation = useNavigation(); // Usamos el hook de navegación

    const openPrivacyPolicy = () => {
        Linking.openURL('https://tusitio.com/privacidad');
    };

    const openTerms = () => {
        Linking.openURL('https://tusitio.com/terminos');
    };

    const contactEmail = () => {
        Linking.openURL('mailto:soporte@finanzasapp.com');
    };
    const goBack = () => {
        navigation.goBack();  // Regresa a la pantalla anterior (Settings)
    };

    return (
        <ScrollView style={dynamicStyles.AboutAppPage}>
            <NavBarTransaction />
            <View style={dynamicStyles.AboutAppPageContent}>

                <TouchableOpacity onPress={goBack} style={dynamicStyles.goBackButton}>
                <Icon name="arrow-back" size={30} color={isDark ? '#fff' : '#000'} />
                </TouchableOpacity>

                {/* Logo y nombre */}
                <View style={dynamicStyles.logoContainer}>
                    <Image
                        source={require('../../../assets/images/icono.png')} // Ajusta la ruta si es necesario
                        style={dynamicStyles.logoImage}
                    />
                    <Text style={[dynamicStyles.sectionTitle, { fontSize: 20 }]}>
                        Finanzas Inteligentes
                    </Text>
                    <Text style={{ color: isDark ? '#aaa' : '#666' }}>Versión 1.0.0</Text>
                </View>

                {/* ¿Qué es esta app? */}
                <View style={dynamicStyles.sectionContent}>
                    <Text style={dynamicStyles.sectionTitle}>{t('AboutApp.whatIsTitle')}</Text>
                    <Text style={dynamicStyles.itemText}>
                        {t('AboutApp.whatIsDescription')}
                    </Text>
                </View>

                {/* Funcionalidades */}
                <View style={dynamicStyles.sectionContent}>
                    <Text style={dynamicStyles.sectionTitle}>{t('AboutApp.featuresTitle')}</Text>
                    <Text style={dynamicStyles.itemText}>• {t('AboutApp.feature1')}</Text>
                    <Text style={dynamicStyles.itemText}>• {t('AboutApp.feature2')}</Text>
                    <Text style={dynamicStyles.itemText}>• {t('AboutApp.feature3')}</Text>
                    <Text style={dynamicStyles.itemText}>• {t('AboutApp.feature4')}</Text>
                </View>

                {/* Misión */}
                <View style={dynamicStyles.sectionContent}>
                    <Text style={dynamicStyles.sectionTitle}>{t('AboutApp.missionTitle')}</Text>
                    <Text style={dynamicStyles.itemText}>{t('AboutApp.missionDescription')}</Text>
                </View>

                {/* Contacto */}
                <View style={dynamicStyles.sectionContent}>
                    <Text style={dynamicStyles.sectionTitle}>{t('AboutApp.contactTitle')}</Text>
                    <TouchableOpacity onPress={contactEmail}>
                        <Text style={[dynamicStyles.itemText, dynamicStyles.linkText]}>soporte@finanzasapp.com</Text>
                    </TouchableOpacity>
                </View>

                {/* Legal */}
                <View style={dynamicStyles.sectionContent}>
                    <Text style={dynamicStyles.sectionTitle}>{t('AboutApp.legalTitle')}</Text>
                    <TouchableOpacity onPress={openPrivacyPolicy}>
                        <Text style={[dynamicStyles.itemText, dynamicStyles.linkText]}>
                            {t('AboutApp.privacyPolicy')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openTerms}>
                        <Text style={[dynamicStyles.itemText, dynamicStyles.linkText]}>
                            {t('AboutApp.termsOfUse')}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

export default AboutApp;
