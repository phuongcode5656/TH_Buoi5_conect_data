import React, { useState } from 'react';

import { View, TextInput, TouchableOpacity, StyleSheet,Alert,Text ,Keyboard } from 'react-native';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const AddUserScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const addUser = async () => {
    try {
      Keyboard.dismiss();
      await addDoc(collection(db, 'users'), { email, name, age: Number(age) });
      Alert.alert('User added!');
      setEmail(''); setName(''); setAge('');  // Clear input
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.canh}>
         <TouchableOpacity style={styles.button}  onPress={addUser}>
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 50,
    fontSize: 20,
    color: 'black',
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  nut: {
    height: 40,
    borderRadius: 10,
  },
  button: {
    width: 140,
    height: 50, // Chiều cao 20 được tăng lên 40 để có không gian cho chữ
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF', // Màu nền nút
    borderRadius: 5,
    margin: 10, // Khoảng cách xung quanh nút
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  canh: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AddUserScreen;