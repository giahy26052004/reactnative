import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
 // Adjust the path accordingly
import bcrypt from "bcryptjs";
import { useNavigation } from "expo-router";
import { REGISTER } from "../api/apiService";
const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pass, setPass] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigation();
  const handleRegister = async (event: any) => {
    const formData = {
      firstName,
      lastName,
      email,
      password: pass,
      mobileNumber,
  };
    event.preventDefault();
    try {
        REGISTER(formData, navigation);

        window.alert("Đăng ký thành công.")
        navigate.navigate("SignIn"); 

    } catch (error) {
        window.alert('Register failed');
    }
};

  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Select")}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.titleSection}>
        <Text style={styles.title}>Đăng ký</Text>
        <Text style={styles.subtitle}>Tạo tài khoản mới</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <FontAwesome5 name="user" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Họ"
            keyboardType="email-address"
            autoCapitalize="none"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesome5 name="user" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Tên"
            keyboardType="email-address"
            autoCapitalize="none"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputWrapper}>
        <Fontisto name="email" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Octicons name="device-mobile" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            autoCapitalize="none"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>


        <View style={styles.inputWrapper}>
          <AntDesign name="lock1" size={24} color="black" />

          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            secureTextEntry={!showPassword} // Hiển thị hoặc ẩn mật khẩu
            autoCapitalize="none"
            value={pass} // giá trị của pass
            onChangeText={setPass} // Cập nhật pass khi người dùng nhập
          />

          <TouchableOpacity
            onPress={() => setShowPassword((prevState) => !prevState)}
          >
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>
            Đồng ý với điều khoản sử dụng của chúng tôi.
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signInButtonContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={handleRegister}>
          <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Bạn đã có tài khoản?{" "}
          <Button
            color={"#324A59"}
            title="Đăng nhập"
            onPress={() => navigation.navigate("SignIn")}
          />
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    padding: 15,
  },
  backButton: {
    marginTop: 30,
    marginBottom: 20,
  },
  titleSection: {
    marginBottom: 30,
    paddingLeft: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#AAAAAA",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 30,
    paddingLeft: 15,
    paddingRight: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 40,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
    borderLeftColor: "#ccc",
  },
  forgotPassword: {
    alignSelf: "center",
    textDecorationLine: "none",
    color: "#324A59",
    fontWeight: "500",
  },
  signInButtonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  signInButton: {
    backgroundColor: "#8B4513",
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    justifyContent: "flex-end",

    marginTop: 50,
  },
  footerText: {
    color: "gray",
  },
  signUpText: {
    color: "#324A59",
    fontWeight: "500",
  },
});
