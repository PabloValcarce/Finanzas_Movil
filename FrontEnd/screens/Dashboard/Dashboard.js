import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext'; // Accede al tema global
import  styles  from './Dashboard.styles'; // Importa los estilos
import AuthForm from '../../components/AuthForm/AuthForm'; // Importa el formulario de autenticación

const Dashboard = () => {
  const { isDark } = useTheme(); // Usa el tema global para obtener el modo oscuro
  const dynamicStyles = styles(isDark); // Aplica los estilos dinámicos dependiendo del tema
  
  return (
    <View style={[dynamicStyles.container]}>
      <View style={[dynamicStyles.dashboardContainer]}>
        <AuthForm />
      </View>
    </View>
  );
};

export default Dashboard;
