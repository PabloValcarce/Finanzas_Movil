import React from 'react';
import { View } from 'react-native';

import AuthForm from '../../components/AuthForm/AuthForm';    
import styles from './Dashboard.styles';

function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.dashboardContainer}>
        <View style={styles.dashboardLogin}>
          <AuthForm />
        </View>
      </View>
    </View>
  );
}

export default Dashboard;
