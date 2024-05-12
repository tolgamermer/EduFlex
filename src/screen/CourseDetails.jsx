import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const CourseDetails = () => {
  const navigation = useNavigation();

  return (
    // Course Code header
    <View>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              marginHorizontal: 12,
              flexDirection: "row",
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#623d85",
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
              <MaterialIcons
                name="keyboard-arrow-left"
                size={32}
                color="#623d85"
              />
            </TouchableOpacity>
            <Text
              style={{ fontSize: 28, fontWeight: "bold", color: "#623d85" }}
            >
              SEN4993
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.courseName}>Summer Training</Text>
            <Text style={styles.courseDescription}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloremque recusandae in temporibus odit atque totam sint, error
              repudiandae optio a laborum distinctio illum fuga delectus nobis
              harum sunt, sapiente quisquam?
            </Text>
          </View>

          <View style={styles.postContainer}>
            <View style={styles.feedItem}>
              <Image
                source={require("../assets/tolga.jpg")}
                style={styles.avatar}
              />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={styles.name}>Tolga</Text>
                    <Text style={styles.postDesc}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum fugit, vero soluta magni optio numquam repudiandae,
                      officiis tempora id alias, aspernatur deserunt dolorum.
                      Magnam soluta corrupti repellat aspernatur sit aliquam?
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={24}
                    color="#73788B"
                  />
                </View>
              </View>
            </View>

            <View style={styles.feedItem}>
              <Image
                source={require("../assets/mehmet.jpg")}
                style={styles.avatar}
              />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={styles.name}>Mehmet</Text>
                    <Text style={styles.postDesc}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum fugit, vero soluta magni optio numquam repudiandae,
                      officiis tempora id alias, aspernatur deserunt dolorum.
                      Magnam soluta corrupti repellat aspernatur sit aliquam?
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={24}
                    color="#73788B"
                  />
                  
                </View>
              </View>
            </View>

            <View style={styles.feedItem}>
              <Image
                source={require("../assets/eduPost.jpg")}
                style={styles.avatar}
              />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={styles.name}>EduPost</Text>
                    <Text style={styles.postDesc}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum fugit, vero soluta magni optio numquam repudiandae,
                      officiis tempora id alias, aspernatur deserunt dolorum.
                      Magnam soluta corrupti repellat aspernatur sit aliquam?
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={24}
                    color="#73788B"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default CourseDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  courseName: {
    color: "#623d85",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 18,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#623d85",
    textAlign: "justify",
  },

  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    margin: 10,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  postDesc: {
    fontSize: 15,
  },
});
