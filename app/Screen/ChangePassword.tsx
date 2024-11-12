import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { CHANGEPASS, GET_ID } from '../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bcrypt = require('bcryptjs');

const ChangePassword = ({ navigation }: { navigation: any }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPass, setOldPassword] = useState('');
  const [user, setUser] = useState({});
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State to toggle visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await AsyncStorage.getItem("userId");
      console.log("Fetched userId:", userId);
      if (!userId) {
        window.alert("User not found.");
        return;
      }

      try {
        const response = await GET_ID("users", userId);
        console.log("API response:", response);
        setUser(response);
        setOldPassword(response.password); // Assuming this is a hash
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, []);

  const handleResetPassword = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const email = await AsyncStorage.getItem("email");
    if (newPassword !== confirmPassword) {
      window.alert("Xác nhận mật khẩu không trùng khớp.");
      return;
    }

    if (newPassword.length < 6) {
      window.alert("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    const data = { ...user, password: newPassword };

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const response = await CHANGEPASS(userId, data);
      if (response.status === 200 || response.status === 201) {
        navigation.navigate('Home');
      } else {
        window.alert("Password change failed.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      window.alert("An error occurred while resetting password.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Profile')}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Thay đổi mật khẩu</Text>

      <View style={styles.inputContainer}>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Nhập mật khẩu cũ"
            secureTextEntry={!showCurrentPassword}
          />
          <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
            <AntDesign name={showCurrentPassword ? "eye" : "eyeo"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            <AntDesign name={showNewPassword ? "eye" : "eyeo"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <AntDesign name={showConfirmPassword ? "eye" : "eyeo"} size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#8B4513",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
