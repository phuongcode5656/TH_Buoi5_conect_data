import React , { useState } from 'react';
import { Text, StyleSheet,Alert } from 'react-native';
import { View, TextInput, Button, FormErrorMessage } from '../components';
import { Colors } from '../config';
import { sendPasswordResetEmail } from 'firebase/auth'; // Thêm dòng này
import { auth } from '../config/firebaseConfig'; // Thêm dòng này
import { useNavigation } from '@react-navigation/native';

 const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent!');
    } catch (error) {
      setError(error.message);
    }
  };
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.screenTitle}>Reset your password </Text>
            </View>
            <TextInput
                name='email'
                leftIconName='email'
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                value={email}
                onChangeText={setEmail}
            />
            <FormErrorMessage error={error} visible={!!error} />
            {/* Nút gửi email reset mật khẩu */}
            <Button style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Send Reset Email </Text>
            </Button>

           
            
            <Button
                style={styles.borderlessButtonContainer}
                borderless
                title={'Go back to Login'}
                onPress={() => navigation.navigate('Login')}
            >
                <Text>Go back to Login</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 12
    },
    innerContainer: {
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
export default ForgotPasswordScreen;