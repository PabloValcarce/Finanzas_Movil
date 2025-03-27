import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavBarLogic } from './NavBarLogic';
import styles from './NavBar.styles';

const NavBarTransaction = () => {
  const {  handleLogout } = useNavBarLogic();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  // Define toggleMenu inside NavBarTransaction
  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
        <Text style={styles.brand}>Finanzas</Text>
      </TouchableOpacity>

      {menuVisible && (
        <View style={[styles.menu, menuVisible && styles.menuOpen]}>
          <TouchableOpacity onPress={() => navigation.navigate('Savings')}>
            <Text style={styles.menuItem}>Ahorro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Spent')}>
            <Text style={styles.menuItem}>Gastos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('List')}>
            <Text style={styles.menuItem}>Transacciones</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.menuItem}>Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <FontAwesomeIcon icon={faSignOutAlt} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={toggleMenu} style={styles.hamburger}>
        <View style={styles.bar}></View>
        <View style={styles.bar}></View>
        <View style={styles.bar}></View>
      </TouchableOpacity>
    </View>
  );
};

export default NavBarTransaction;
