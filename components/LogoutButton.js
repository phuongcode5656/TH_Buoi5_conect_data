import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LogoutButton = ({ onLogout }) => {
  return (
    
   <TouchableOpacity style={styles.out} onPress={onLogout} >
    <Text style={styles.chu}>Logout</Text>
   </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
out: {
  marginVertical: 30,
  backgroundColor: "#FF4500",
  justifyContent:"center",
  alignContent: "center",
  flexDirection: "row",
  height: 50,
  borderWidth: 2,
  borderRadius: 8,
  width:"80%",
  marginHorizontal: "10%",
},
chu: {
  fontSize:20,
  color: 'white',
  marginTop: 10,
}
});
export default LogoutButton;
