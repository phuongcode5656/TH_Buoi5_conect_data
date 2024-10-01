import React, { useState } from 'react';
import { Text, StyleSheet, Alert,KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Thêm dòng này
import { auth } from '../config/firebaseConfig'; // Thêm dòng này
import { useNavigation } from '@react-navigation/native';
import UserList from './UserListScreen'

 const LoginScreen = () => {
    const navigation = useNavigation();
  const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Lấy thông tin người dùng
      
     
    } catch (error) {
      alert("Ban nhap sai du lieu!");
      setError(error.message);
    }
  };
  
  
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     keyboardVerticalOffset={20} 
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.screenTitle}>Welcome back!</Text>
        </View>

        <TextInput
          placeholder="Enter email"
          autoCapitalize="none"
          leftIconName="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
       

        <TextInput
           placeholder="Enter password"
           autoCapitalize="none"
           leftIconName="key-variant"
           secureTextEntry={passwordVisibility}
           handlePasswordVisibility={handlePasswordVisibility} // đổi hình con mắt khi click
           value={password}
           onChangeText={setPassword}
           rightIcon={rightIcon}
           onRightIconPress={handlePasswordVisibility}
        />
        <FormErrorMessage error={error} visible={!!error} />

        <Button style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login </Text>
        </Button>

        <Button
          style={styles.borderlessButtonContainer}
          borderless
          title="Create a new account?"
          onPress={() => navigation.navigate('SignupScreen')}
        />

        <Button
          style={styles.borderlessButtonContainer}
          borderless
          title="Forgot Password"
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    zIndex: -1,
    backgroundColor: 'transparent', 
 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Điều chỉnh nội dung ở giữa màn hình
  },
  logoContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    paddingVertical: 12, // Tăng padding để tạo không gian
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700'
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginScreen;