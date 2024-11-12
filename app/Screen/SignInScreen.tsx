  import React, { useEffect, useState } from "react";
  import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
  } from "react-native";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
  import FontAwesome from "@expo/vector-icons/FontAwesome";
  import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
  import { GET_ID, LOGIN } from "../api/apiService";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useToast } from "react-native-toast-notifications";

  const SignInScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUserName] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [enteredCaptcha, setEnteredCaptcha] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const RELOAD_INTERVAL = 1000;
    const generateCaptcha = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      return Array.from({ length: 5 }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      ).join("");
    };
    useEffect(() => {
      setCaptcha(generateCaptcha());
    }, []);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await GET_ID("users/email", email);
          console.log("API response:", response);
          
          if (response && response.cart && response.cart.cartId) {
            setUserName(response.lastName);
            await AsyncStorage.setItem("cartId", response.cart.cartId); // Lưu cartId
            await AsyncStorage.setItem('userId', response.userId); // Lưu userId
    
            await AsyncStorage.setItem("userInfo", JSON.stringify(response));
          } else {
            console.error("Unexpected response format:", response);
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      };
    
      if (email) {
        fetchUser();
        const intervalId = setInterval(() => {
          fetchUser(); // Gọi lại fetchUser mỗi khoảng thời gian
        }, RELOAD_INTERVAL);
  
        return () => clearInterval(intervalId); 
      }
    }, [email]);
      
  console.log ("fjsdhfsjkdf",username);
    const handleLogin = async () => {
      const body = { email, password };

      try {
        if (enteredCaptcha !== captcha) {
        window.alert("CAPTCHA không khớp. Vui lòng thử lại.");
          setCaptcha(generateCaptcha()); // Tạo mã CAPTCHA mới nếu nhập sai
          setEnteredCaptcha(""); // Xóa ô nhập CAPTCHA
          return;
        }
        const response = await LOGIN(body);
        
        if (response && response.data) {
          const token = response.data["jwt-token"];
          //const cartId = response.data.cart.cartId;
          if (token) {
            await AsyncStorage.setItem("authToken", token);
            await AsyncStorage.setItem("email", body.email);
           // await AsyncStorage.setItem("cartId", cartId);
           
          //  showToast();
            navigation.navigate("Home");
          } else {
           window.alert("Token not found in response");
          }
        
        } else {
          window.alert("Login response is missing data");
        }
      } catch (error) {
        window.alert("Login failed:", error.message);
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
          <Text style={styles.title}>Đăng nhập</Text>
          <Text style={styles.subtitle}>Chào mừng bạn đến với </Text>
        </View>

        <View style={styles.inputContainer}>
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
            <AntDesign name="lock1" size={24} color="black" />

            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              secureTextEntry={!showPassword} // Hiển thị hoặc ẩn mật khẩu
              autoCapitalize="none"
              value={password} // giá trị của pass
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
          <View style={styles.captcha}>
          <TextInput
          style={styles.input1}
          placeholder="Nhập mã CAPTCHA"
          value={enteredCaptcha}
          onChangeText={setEnteredCaptcha}
        />
          <TouchableOpacity style={styles.changeCaptchaButton} onPress={() => setCaptcha(generateCaptcha())}>
          <AntDesign name="reload1" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.captchaText}>{captcha}</Text>
        
          </View>
        
    
        </View>

        <View style={styles.signInButtonContainer}>
          <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
            <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Khách hàng mới?  
            <Button
              color={"#324A59"}
              title="Đăng ký"
              onPress={() => navigation.navigate("SignUp")}
            />
          </Text>
        </View>
      </View>
    );
  };

  export default SignInScreen;

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
    changeCaptchaButton: {
    marginLeft:20,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
    },
    captcha:{
      flexDirection:"row"
    },
    captchaText: {
      fontSize: 18,
      fontWeight: "bold",
  marginLeft:10,
  textDecorationLine:'line-through',
      textAlign: "center",
    },
    input1: {
  fontSize:14,
      marginLeft: 10,
  height:40,
      color: "#000",
      border:"1px solid #000"
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
      borderBottomColor: "#ddd",

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
      textDecorationLine: "underline",
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
      marginTop: 250,
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      justifyContent: "flex-end",

      marginTop: 50,
    },
    footerText: {
      color: "gray",
      marginRight: 30,
    },
    signUpText: {
      color: "#324A59",
      fontWeight: "500",
    },
  });

