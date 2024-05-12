import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { imagesDataURL } from "../constant/data";
import * as ImagePicker from "expo-image-picker";

const EditScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [name, setName] = useState("Tolga Recep Mermer");
  const [email, setEmail] = useState("tolgarecep.mermer@bahcesehir.edu.tr");
  const [information, setInformation] = useState(
    "4th grade in the Software Engineering Department of Bahcesehir University"
  );
  const [password, setPassword] = useState("randompassword");
  const [university, setUniversity] = useState("Bahcesehir University");

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
            top: 5,
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={36} color="#000" />
        </TouchableOpacity>

        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Edit Profile</Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: "#242760",
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons name="photo-camera" size={32} color="#242760" />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 16 }}>Name</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: "rgba(84, 76, 76, 0.14)",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 16 }}>Information</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: "rgba(84, 76, 76, 0.14)",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={information}
                onChangeText={(value) => setInformation(value)}
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 16 }}>Email</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: "rgba(84, 76, 76, 0.14)",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={email}
                onChangeText={(value) => setEmail(value)}
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 16 }}>Password</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: "rgba(84, 76, 76, 0.14)",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={password}
                onChangeText={(value) => setPassword(value)}
                editable={true}
                secureTextEntry
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 16 }}>University</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: "rgba(84, 76, 76, 0.14)",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={university}
                onChangeText={(value) => setUniversity(value)}
                editable={true}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#242760",
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#FFF",
            }}
          >
            Save Change
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({});
