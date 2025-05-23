import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import { useNavBarLogic } from './NavBarLogic';
import { styles } from './NavBar.styles'; 
import { useTheme } from '../../context/ThemeContext'; 
import { useTranslation } from 'react-i18next';

const NavBarTransaction = () => {
  const { handleLogout } = useNavBarLogic();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const { isDark } = useTheme();
  const dynamicStyles = styles(isDark); 
  const { t } = useTranslation();

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  return (
    <View style={dynamicStyles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
        <Text style={dynamicStyles.brand}>{t('Navbar.Title')}</Text>
      </TouchableOpacity>

      {menuVisible && (
        <View style={[dynamicStyles.menu, dynamicStyles.menuOpen]}>
          <TouchableOpacity onPress={() => navigation.navigate('Savings')}>
            <Text style={dynamicStyles.menuItem}>{t('Navbar.Menu.Savings')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Spent')}>
            <Text style={dynamicStyles.menuItem}>{t('Navbar.Menu.Spent')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Budget')}>
            <Text style={dynamicStyles.menuItem}>{t('Navbar.Menu.Budget')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('List')}>
            <Text style={dynamicStyles.menuItem}>{t('Navbar.Menu.Transactions')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={dynamicStyles.menuItemContainer}>
            <Text style={dynamicStyles.menuItem}>{t('Navbar.Menu.Settings')}</Text>
            <FontAwesomeIcon icon={faCog} size={20} color={dynamicStyles.icon.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={dynamicStyles.logoutButton}>
            <FontAwesomeIcon icon={faSignOutAlt} size={20} color={dynamicStyles.icon.color} />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={toggleMenu} style={dynamicStyles.hamburger}>
        <View style={dynamicStyles.bar}></View>
        <View style={dynamicStyles.bar}></View>
        <View style={dynamicStyles.bar}></View>
      </TouchableOpacity>
    </View>
  );
};

export default NavBarTransaction;
