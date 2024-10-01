import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen'; // Nhập đúng file
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'; // Nhập đúng file
import UserListScreen from './screens/UserListScreen';
import AddUserScreen from './screens/AddUserScreen';
import LogoutButton from './components/LogoutButton'; // Nhập đúng file
import { auth } from './config/firebaseConfig';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Dọn dẹp khi component bị gỡ
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? (
          <Drawer.Navigator>
            <Drawer.Screen name="UserList" component={UserListScreen} />
            <Drawer.Screen name="AddUser" component={AddUserScreen} />
            <Drawer.Screen 
              name="Logout" 
              options={{
                title: 'Logout',
                drawerItemStyle: { height: 60 }, // Tùy chỉnh chiều cao nếu cần
              }}
            >
              {() => <LogoutButton onLogout={handleLogout} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Login', headerShown: false }}
            />
            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              options={{ title: 'Sign Up', headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{ title: 'Forgot Password', headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
