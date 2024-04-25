import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleOtptoLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      

      <View>
        <Text style={styles.informationText}>We will send you a One Time Password to your Email address</Text>
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          name={"user"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput style={styles.TextInput} placeholder="E-mail" />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          name={"key"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Verification Code"
          secureTextEntry
        />
      </View>

      <View style={styles.otpButtonContainer}>
        <Text style={styles.signIn}>GET OTP</Text>
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
      

      <View style={styles.bottomVectorContainer}>
        <Image
          source={require("../assets/bottomVector.png")}
          style={styles.bottomVectorImage}
        ></Image>
      </View>

      <Text style={styles.footerText} onPress={handleOtptoLogin}>
          Back to Login Page
        </Text>

    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    height: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  informationText: {
    textAlign: "center",
    fontSize: 36,
    flexWrap: "wrap",
    marginBottom: 50,
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
  
  otpButtonContainer: {
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
    color: "#BEBEBE",
    textAlign: "center",
    fontSize: 18,
    marginTop: 60,
  },
  bottomVectorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  bottomVectorImage: {
    height: 250,
    width: 180,
  },
});
