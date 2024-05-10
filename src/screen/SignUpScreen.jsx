import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import React from "react";
import { Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from 'react-native-paper';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState('student');

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>

      <View>
        <Text style={styles.createAccountText}>Create Account</Text>
      </View>
      <Text style={styles.description}>
        Create account using educational institutional mail address
      </Text>
      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
            <Text>Instructor</Text>
            <RadioButton value="instructor" />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Student</Text>
            <RadioButton value="student" />
          </View>
        </View>
      </RadioButton.Group>
      <View style={styles.inputContainer}>
        <FontAwesome
          name={"user"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput style={styles.TextInput} placeholder="Name" />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          name={"address-card"}
          size={18}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput style={styles.TextInput} placeholder="Surname" />
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

      <View style={styles.inputContainer}>
        <AntDesign
          name={"mail"}
          size={22}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput style={styles.TextInput} placeholder="Email" />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          name={"mobile"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput style={styles.TextInput} placeholder="Mobile" />
      </View>

      <TouchableOpacity onPress={handleLogin}>
        <View style={styles.signInButtonContainer}>
          <Text style={styles.signIn}>Create Account</Text>
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
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    position: "relative",
  },
  description: {
    textAlign: "center",
  },
  topImage: {
    width: "100%",
    height: 130,
  },
  createAccountText: {
    textAlign: "center",
    fontSize: 30,
    color: "#262626",
    marginBottom: 30,
    fontWeight: "bold",
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
  marginTop: 20, // Decrease this value to move the button upwards
  justifyContent: "center",
  width: "90%",
  justifyContent: "flex-end",
  margin: -10,
  },
  signIn: {
    color: "#262626",
    fontSize: 25,
    fontWeight: "bold",
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
  },
  footerContainer: {
    marginTop: 25,
  },
});
