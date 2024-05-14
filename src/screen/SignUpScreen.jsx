import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from 'react-native-paper';
import axios from 'axios'; // Axios kütüphanesini import edin

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [role, setRole] = useState('Student');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [universityInfo, setUni] = useState('');

  const handleLogin = async () => {
    if (!name.trim() || !surname.trim() || !email.trim() || !password.trim() || !mobile.trim() || !universityInfo.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        username: name + surname,
        email,
        password,
        role,
        universityInfo,
        name,
        surname,
        mobile
      });
      console.log(response, "response")
      if (response.status === 201) {
        alert('Signup Successful');
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView >
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
        <RadioButton.Group onValueChange={newValue => setRole(newValue)} value={role} style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
              <Text>Instructor</Text>
              <RadioButton value="Teacher" />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Student</Text>
              <RadioButton value="Student" />
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
          <TextInput
            style={styles.TextInput}
            placeholder="Name"
            value={name}
            onChangeText={setName} // Burada name state'ini güncelle
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name={"address-card"}
            size={18}
            color={"#9A9A9A"}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Surname"
            value={surname}
            onChangeText={setSurname} // Burada surname state'ini güncelle
            autoCapitalize="none"
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
            onChangeText={setPassword} // Burada password state'ini güncelle
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign
            name={"mail"}
            size={22}
            color={"#9A9A9A"}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail} // Burada email state'ini güncelle
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome
            name={"mobile"}
            size={24}
            color={"#9A9A9A"}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Mobile"
            value={mobile}
            onChangeText={setMobile} // Burada mobile state'ini güncelle
          />
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
            placeholder="University Name"
            value={universityInfo}
            onChangeText={setUni}
            autoCapitalize="none"
          />
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
      </ScrollView>
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
    marginBottom: 20,
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
