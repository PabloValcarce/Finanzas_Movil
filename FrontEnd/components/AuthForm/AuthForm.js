import { useEffect, useState } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import useAuth from '../../utils/useAuth';
import Icon from 'react-native-vector-icons/Entypo';
import { useTheme } from '../../context/ThemeContext';
import styles from './AuthForm.styles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AuthForm() {
  const {
    isRegister,
    setIsRegister,
    name,
    setName,
    email,
    password,
    setPassword,
    emailError,
    handleEmailChange,
    handleSubmit,
    handleBiometricAuth,
  } = useAuth();

  const { isDark } = useTheme();
  const dynamicStyles = styles(isDark);
  const { t } = useTranslation();
  const [hasBiometricPreference, setHasBiometricPreference] = useState(false);
  const [isBiometricLogin, setIsBiometricLogin] = useState(false); 


  useEffect(() => {
    AsyncStorage.getItem('biometric_login').then(value => {
      if (value) setHasBiometricPreference(true);
    });
  }, []);


  return (
    <View style={dynamicStyles.authForm}>
      <Text style={dynamicStyles.title}>{isRegister ? t('DashBoard.titleRegister') : t('DashBoard.titleLogin')}</Text>
      <View style={dynamicStyles.form}>
        {isRegister && (
          <TextInput
            style={dynamicStyles.input}
            placeholder={t('DashBoard.Name')}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={isDark ? '#aaa' : '#555'}
          />
        )}
        <TextInput
          style={[dynamicStyles.input, emailError ? dynamicStyles.errorInput : null]}
          placeholder={t('DashBoard.Email')}
          value={email}
          onChangeText={handleEmailChange}
          placeholderTextColor={isDark ? '#aaa' : '#555'}
        />
        {emailError && <Text style={dynamicStyles.errorText}>{emailError}</Text>}
        <TextInput
          style={dynamicStyles.input}
          placeholder={t('DashBoard.Password')}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          placeholderTextColor={isDark ? '#aaa' : '#555'}
        />
        <TouchableOpacity
          style={dynamicStyles.submitButton}
          onPress={() => {
            handleSubmit(isBiometricLogin); 
          }}
        >
          <Text style={dynamicStyles.submitButtonText}>
            {isRegister ? t('DashBoard.titleRegister') : t('DashBoard.titleLogin')}
          </Text>
        </TouchableOpacity>


        {!isRegister && hasBiometricPreference && (
          <TouchableOpacity
            style={dynamicStyles.biometricButton}
            onPress={() => {
              setIsBiometricLogin(true);
              handleBiometricAuth()
            }}
          >
            <Icon name="fingerprint" style={dynamicStyles.finger} />
          </TouchableOpacity>
        )}

      </View>

      <TouchableOpacity
        style={dynamicStyles.switchButton}
        onPress={() => setIsRegister(!isRegister)}
      >
        <Text style={dynamicStyles.switchButtonText}>
          {isRegister ? t('DashBoard.ChangeLogin') : t('DashBoard.titleRegister')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default AuthForm;
