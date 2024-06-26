import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';  // Make sure to import axios
import { useAuth } from '../contexts/AuthContext'; // Context'i import edin

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, serUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth(); // Context'ten signIn fonksiyonunu çekin


  const handleRegister = () => {
    navigation.navigate("SignUp");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleHomeScreen = async () => {

    if (!username.trim() || !password.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username: username,  // Assuming the backend expects 'username' as the email
        password: password,
      });

      if (response.data.accessToken) {
        signIn(response.data); // Kullanıcı bilgilerini context'e kaydet
        // Store the received token in storage or state management
        console.log('Login successful', response.data);
        alert('Login successful');
        navigation.navigate("HomeScreen");  // Navigate to HomeScreen on successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + (error.response?.data?.message || 'Server Error'));
    }
  };




  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.helloContainer}>
        <Image
          source={require("../assets/eduFlexLogo.png")}
          style={styles.eduFlexLogo}
        ></Image>
      </View>

      <View>
        <Text style={styles.eduText}>EduFlex</Text>
        <Text style={styles.signInText} >Sign in to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome
          name={"user"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="E-mail"
          value={username}
          autoCapitalize="none"
          onChangeText={serUsername}  // Update the email state on text change
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          name={"lock"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}  // Update the password state on text change
        />
      </View>

      <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
        Forget your password?
      </Text>
      <View style={styles.signInButtonContainer}>
        <Text style={styles.signIn} onPress={handleHomeScreen}>Sign in</Text>
        <LinearGradient
          // Button Linear Gradient
          colors={["#F97794", "#623AA2"]}
          style={styles.linearGradient}
        >
          <FontAwesome
            name={"arrow-right"}
            size={24}
            color={"white"}
            style={styles.inputIcon}
          />
        </LinearGradient>
      </View>
      <TouchableOpacity onPress={handleRegister} style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Don't have an account?
          <Text style={{ textDecorationLine: "underline" }}>Create</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    position: "relative",
  },
  topImageContainer: {},
  eduFlexLogo: {},
  topImage: {
    width: "100%",
    height: 130,
  },
  helloContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  eduText: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "500",
    color: "#623d85",
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    color: "#623d85",
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: "center",
    height: 50,
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 5,
  },
  TextInput: {
    flex: 1,
  },
  forgotPasswordText: {
    color: "#BEBEBE",
    textAlign: "right",
    width: "90%",
    fontSize: 15,
  },
  signInButtonContainer: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
    width: "90%",
    justifyContent: "flex-end",
  },
  signIn: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#623d85",
  },
  linearGradient: {
    height: 34,
    width: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  footerText: {
    color: "#262626",
    textAlign: "center",
    fontSize: 16,
    marginTop: 60,
  },
});
