import { useState, useCallback } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useCategories } from '../context/CategoryContext';
import * as LocalAuthentication from 'expo-local-authentication';

const useAuth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { fetchUserId } = useCategories();

  // Función para verificar si el token es válido
  const checkToken = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      if (!access_token) {
        navigateToDashboard();
        return;
      }

      const decodedToken = decodeToken(access_token);
      if (!decodedToken) {
        await AsyncStorage.removeItem('access_token');
        navigateToDashboard();
        return;
      }

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        await AsyncStorage.removeItem('access_token');
        navigateToDashboard();
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
    }
  };

  // Función para decodificar el JWT
  const decodeToken = (access_token) => {
    const base64Url = access_token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  // Función para manejar la autenticación biométrica
  const handleBiometricAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      alert('Tu dispositivo no admite autenticación biométrica');
      return;
    }

    const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (biometricTypes.length === 0) {
      alert('No hay métodos biométricos disponibles');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autentícate con biometría',
      cancelLabel: 'Cancelar',
      disableDeviceFallback: false,
    });

    if (result.success) {
      handleSubmit(true); // Si es exitoso, mandamos true a handleSubmit
    } else {
      alert('Autenticación biométrica fallida');
    }
  };

  // Validación de email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  // Función de envío (login o registro)
  const handleSubmit = useCallback(async (biometric = false) => {
    setIsLoading(true);
    let endpoint = '';
    let data = {};

    if (biometric) {
      // Si es biométrico, usamos el refresh token
      const storedRefreshToken = await AsyncStorage.getItem('refresh_token');
      if (!storedRefreshToken) {
        alert('No hay refresh token almacenado. Inicia sesión con email y contraseña.');
        setIsLoading(false);
        return;
      }
      endpoint = '/auth/refresh-token';
      data = { refresh_token: storedRefreshToken };
    } else {
      // Login tradicional (email + password)
      if (!validateEmail(email)) {
        setEmailError('Invalid email address');
        setIsLoading(false);
        return;
      }
      endpoint = isRegister ? '/auth/register' : '/auth/login';
      data = isRegister ? { name, email, password } : { email, password };
    }

    try {
      const response = await api.post(endpoint, data);
      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;
        if (access_token && refresh_token) {
          await AsyncStorage.setItem('access_token', access_token);
          await AsyncStorage.setItem('refresh_token', refresh_token);

          if (!isRegister) {
            await AsyncStorage.setItem('biometric_login', 'true'); // Guarda la preferencia biométrica
          }

          navigation.reset({
            index: 0,
            routes: [{ name: 'Transactions' }],
          });
          fetchUserId();
        } else {
          console.error("Tokens no recibidos en la respuesta");
        }
      }
    } catch (error) {
      console.error("Fallo en autenticación", error);
    } finally {
      setIsLoading(false);
    }
  }, [email, isRegister, name, password, navigation]);

  // Función para redirigir al dashboard si no hay token
  const navigateToDashboard = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };

  // Verificar si el usuario ha iniciado sesión previamente con biometría
  const verifyBiometricLogin = async () => {
    const isBiometricSaved = await AsyncStorage.getItem('biometric_login');
    if (isBiometricSaved === 'true') {
      await handleBiometricAuth(); // Si tiene habilitada la biometría, realizar login biométrico
    } else {
      navigation.navigate('Login');
    }
  };

  return {
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
    checkToken,
    verifyBiometricLogin,
  };
};

export default useAuth;
