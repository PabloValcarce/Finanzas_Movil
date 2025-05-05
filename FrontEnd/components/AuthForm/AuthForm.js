import React from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import useAuth from '../../utils/useAuth';
import Icon from 'react-native-vector-icons/Entypo';
import { useTheme } from '../../context/ThemeContext';
import  styles  from './AuthForm.styles'; 

function AuthForm() {
  const {
    isRegister,
    setIsRegister,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    handleEmailChange,
    handleSubmit,
    handleBiometricAuth,
    isLoading,
  } = useAuth();

  const { isDark } = useTheme();
  const dynamicStyles = styles(isDark);

  return (
    <View style={dynamicStyles.authForm}>
      <Text style={dynamicStyles.title}>{isRegister ? 'Register' : 'Login'}</Text>
      <View style={dynamicStyles.form}>
        {isRegister && (
          <TextInput
            style={dynamicStyles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={isDark ? '#aaa' : '#555'}
          />
        )}
        <TextInput
          style={[dynamicStyles.input, emailError ? dynamicStyles.errorInput : null]}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          placeholderTextColor={isDark ? '#aaa' : '#555'}
        />
        {emailError && <Text style={dynamicStyles.errorText}>{emailError}</Text>}
        <TextInput
          style={dynamicStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          placeholderTextColor={isDark ? '#aaa' : '#555'}
        />
        <TouchableOpacity
          style={dynamicStyles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={dynamicStyles.submitButtonText}>
            {isRegister ? 'Register' : 'Login'}
          </Text>
        </TouchableOpacity>

        {!isRegister && (
          <TouchableOpacity
            style={dynamicStyles.biometricButton}
            onPress={handleBiometricAuth}
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
          {isRegister ? 'Cambiar a Login' : 'Cambiar a Registro'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default AuthForm;
