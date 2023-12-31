import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, SafeAreaView} from 'react-native';
import {ToastProvider} from 'react-native-toast-message';
import MainScreen from './src/MainScreen/index.jsx';
import Dashboard from './src/Dashboard/index.jsx';
import ResultScreen from './src/ResultScreen/index.jsx';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

export default App = () => {
  const Stack = createStackNavigator();
  const toastConfig = {
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
          fontWeight: 100,
          color: 'red',
          fontFamily: 'Inter-Medium',
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="MainScreen"
          headerMode={false}
          component={MainScreen}
        />
        <Stack.Screen name="DisplayScreen" component={ResultScreen} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};
