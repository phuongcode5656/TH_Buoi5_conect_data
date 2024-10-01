import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: '', name: '', email: '', age: '' });

  // Lấy danh sách users từ Firestore
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  // Xóa user khỏi Firestore với xác nhận
  const deleteUser = (id) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa người dùng này?',
      [
        { text: 'Hủy', onPress: () => console.log('Hủy xóa'), style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            await deleteDoc(doc(db, "users", id));
           
            fetchUsers(); // Refresh lại danh sách sau khi xóa
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Cập nhật thông tin người dùng
  const updateUser = async () => {
    const { id, name, email, age } = currentUser;
    await updateDoc(doc(db, "users", id), { name, email, age });
    Alert.alert('User updated');
    setModalVisible(false);
    fetchUsers(); // Refresh lại danh sách sau khi cập nhật
  };

  // Mở hộp thoại cập nhật
  const openUpdateModal = (user) => {
    setCurrentUser(user);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userText}>Name: {item.name} </Text>
      <Text style={styles.userText}>Email: {item.email} </Text>
      <Text style={styles.userText}>Age: {item.age} </Text>
      <View style={styles.nuts}>
        <TouchableOpacity onPress={() => openUpdateModal(item)} style={styles.update}>
          <Text style={styles.userText2}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteUser(item.id)} style={styles.deleteButton}>
          <Text style={styles.userText2}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.re} onPress={fetchUsers}>
        <Text style={styles.textre}>Reload </Text>
      </TouchableOpacity>
      
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderUserItem}
      />

      {/* Modal cập nhật thông tin */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Name"
              value={currentUser.name}
              onChangeText={(text) => setCurrentUser({ ...currentUser, name: text })}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Email"
              value={currentUser.email}
              onChangeText={(text) => setCurrentUser({ ...currentUser, email: text })}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Age"
              value={currentUser.age}
              onChangeText={(text) => setCurrentUser({ ...currentUser, age: text })}
              keyboardType="numeric"
              style={styles.modalInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={updateUser} style={styles.modalButton}>
                <Text style={styles.userText3}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.userText3}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Thêm các kiểu dáng ở đây
  container: {
    flex: 1,
    padding: 10,
  },
  re:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#33CCFF",
    height: 45,
    borderWidth:1,
    borderRadius: 8,
    marginVertical: 8,
    marginBottom: 20,
  },
  textre:{
    fontSize: 20,
    color: '#333',
    fontWeight: "bold"
  },
  userItem: {
    backgroundColor: '#FFFAF0',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 7, // Chỉ áp dụng cho Android
  },
  nuts:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 4

  },
  userText: {
    fontSize: 20,
    color: '#333',
  },
  userText2: {
    fontSize: 18,
    color: 'white',
    marginBottom: 4
  },
  deleteButton: {
    borderRadius: 15,
    width: 100,
    height: 40,
   
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    alignSelf: 'flex-end', // Đặt nút ở góc dưới bên phải
  },
  update: {
    borderRadius: 15,
    width: 100,
    height: 40,
   
    backgroundColor: "orange",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    alignSelf: 'flex-end', // Đặt nút ở góc dưới bên phải
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền tối cho modal
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalInput: {
    height: 50,
    borderColor: '#000',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    width: '48%', // Nút nhỏ hơn để có khoảng cách
    alignContent:"center",
    justifyContent: "center",
    flexDirection: "row"
  },
  userText3: {
    fontSize: 18,
    color: 'white',
    marginBottom: 4
  },
});

export default UserListScreen;
