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

const LoginScreen = () => {
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

  const handleFeedScreen = () => {
    navigation.navigate("FeedScreen");
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
        <TextInput style={styles.TextInput} placeholder="E-mail" />
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
        />
      </View>

      <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
        Forget your password?
      </Text>
      <View style={styles.signInButtonContainer}>
        <Text style={styles.signIn} onPress={handleFeedScreen}>Sign in</Text>
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
