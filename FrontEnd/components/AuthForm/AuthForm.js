import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import styles from './AuthForm.styles';
import useAuth from '../../utils/useAuth';
import Icon from 'react-native-vector-icons/Entypo';

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
    handleBiometricAuth, // <-- Importa la función de autenticación biométrica
    isLoading,
  } = useAuth();

  return (
    <View style={styles.authForm}>
      <Text style={styles.title}>{isRegister ? 'Register' : 'Login'}</Text>
      <View style={styles.form}>
        {isRegister && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        )}
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null]}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.submitButtonText}>
            {isRegister ? 'Register' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Botón de autenticación biométrica */}
        {!isRegister && (
          <TouchableOpacity
            style={styles.biometricButton}
            onPress={handleBiometricAuth}
          >
            <Icon name="fingerprint" size={35} color="white" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsRegister(!isRegister)}
      >
        <Text style={styles.switchButtonText}>
          {isRegister ? 'Cambiar a Login' : 'Cambiar a Registro'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default AuthForm;
