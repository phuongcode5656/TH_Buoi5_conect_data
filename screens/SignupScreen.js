import React, { useState } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { auth } from '../config/firebaseConfig'; // Thêm dòng này
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Thêm dòng này

import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
   
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created!');
    } catch (error) {
      alert
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo uri={Images.logo} />
        <View style={{justifyContent: "center", alignItems: 'center'}}>
        <Text style={styles.screenTitle}>Create a new account! </Text>
        </View>
        
      </View>
      <TextInput
        placeholder='Enter email'
        autoCapitalize='none'
        leftIconName='email'
        keyboardType='email-address'
        textContentType='emailAddress'
        value={email}
        onChangeText={setEmail}
      />
      <FormErrorMessage error={''} visible={false} />
      <TextInput
        placeholder='Enter password'
        leftIconName='key-variant'
       
        secureTextEntry={passwordVisibility}
        value={password}
        onChangeText={setPassword}
        rightIcon={rightIcon}
        onRightIconPress={handlePasswordVisibility}
      />
      <FormErrorMessage error={''} visible={false} />
      <TextInput
        placeholder='Confirm password'
        leftIconName='key-variant'
       secureTextEntry={passwordVisibility}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        rightIcon={rightIcon}
        onRightIconPress={handlePasswordVisibility}
        
      />
      <FormErrorMessage error={''} visible={false} />
      <Button style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup </Text>
      </Button>
      
      {/* Button to navigate to Login screen */}
          <Button
          style={styles.borderlessButtonContainer}
          borderless
          title={'Already have an account?'}
          onPress={() => navigation.navigate('Login')}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20,
    
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignupScreen;
