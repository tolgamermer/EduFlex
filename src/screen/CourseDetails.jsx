import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FeedItem = ({ name, postDesc, avatar }) => (
  <View style={styles.feedItem}>
    <Image source={avatar} style={styles.avatar} />
    <View style={{ flex: 1 }}>
      <View style={styles.row}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.postDesc}>{postDesc}</Text>
        </View>
      </View>
      <View style={styles.row}>
      </View>
    </View>
  </View>
);

const CourseDetails = ({ route }) => {
  const { course } = route.params;
  const navigation = useNavigation();

  const [notificationClicked, setNotificationClicked] = useState(false);


  const feedItems = [
    { name: 'Instructor', postDesc: 'Announcement', avatar: require("../assets/USER.png") },
    { name: 'Instructor', postDesc: 'Announcement', avatar: require("../assets/USER.png") },
    { name: 'Instructor', postDesc: 'Announcement', avatar: require("../assets/USER.png") },
  ];

  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialIcons name="keyboard-arrow-left" size={32} color="#623d85" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{course.code}</Text>
            <TouchableOpacity onPress={() => setNotificationClicked(!notificationClicked)} style={styles.rightButton}>
              <Ionicons
                name={notificationClicked ? "notifications-off-outline" : "notifications-outline"}
                size={24}
                color="#623d85"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>

          </View>

          <View style={styles.container}>
            <Text style={styles.courseName}>{course.codeName}</Text>
            <Text style={styles.courseDescription}>Course Description / Details</Text>
          </View>

          <View style={styles.postContainer}>
            {feedItems.map((item, index) => (
              <FeedItem key={index} {...item} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#623d85",
  },
  backButton: {
    top: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#623d85",
  },
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightButton: {
    marginRight: 10,
  },
});