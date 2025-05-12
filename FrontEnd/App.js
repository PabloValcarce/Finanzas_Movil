import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthLoadingScreen from './screens/AuthLoadingScreen';  
import Dashboard from './screens/Dashboard/Dashboard';
import TransactionHome from './screens/Transactions/TransactionsHome/TransactionHome';
import TransactionsList from './screens/Transactions/TransactionList/TransactionList';
import AppContextProvider from './context/AppContextProvider';
import Savings from './screens/Transactions/Savings/Savings';
import Spent from './screens/Transactions/Spent/Spent';
import Settings from './screens/Settings/SettingsHome/Settings';
import AboutApp from './screens/Settings/AboutApp/AboutApp'; 
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppContextProvider>
        <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Transactions" component={TransactionHome} />
          <Stack.Screen name="List" component={TransactionsList} />
          <Stack.Screen name="Savings" component={Savings} />
          <Stack.Screen name="Spent" component={Spent} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="AboutApp" component={AboutApp} />
        </Stack.Navigator>
      </AppContextProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
