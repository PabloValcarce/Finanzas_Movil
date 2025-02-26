import { StyleSheet } from 'react-native';
import AppStyles from '../../styles/AppStyles'; // Importar los estilos globales

export default StyleSheet.create({
  authForm: {
    ...AppStyles.container,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.primary.backgroundColor,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 45,
    marginBottom: 10,
    width: 250,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  switchButton: {
    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF4500',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  biometricButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '30%',
    marginTop: 15,
    padding: 10,
  },
  biometricButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },

});
