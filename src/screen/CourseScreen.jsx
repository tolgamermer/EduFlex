import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import CourseDetails from './CourseDetails';

const courses = [
  'SEN4993 - Summer Trainning',
  'PRL3522 - Ethics of Public Relations',
  'HUK1005 - Genel Hukuk Bilgisi',
  'SEN4013 - Software Verification and Validation',
  'NMD3210 - Media Literacy',
  'GEP0432 - English for Specific Purposes',
  'CMP4501 - Introduction to Artificcial Inteligence & Export Systems',
  'MAT3012 - Numericial Analysis',
  'GEP1015 - Temel İlk Yardım',
];

const CourseScreen = () => {

  const navigation = useNavigation();

  const handleCourseDetails = () => {
    navigation.navigate("CourseDetails");
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Courses </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20,  }}>
        {courses.map((course, index) => (
          <View  key={index} style={styles.outerView} >
            <Pressable onPress={handleCourseDetails} style={styles.pressable}>
              <Text  style={styles.text}>{course}</Text>
              <View style={styles.iconView}>
                <Ionicons name="chevron-forward-outline" size={30} color="#623d85" />
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({
  header: {
    paddingTop: 35,
    paddingBottom: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10

  },
  headerTitle: {
    fontSize: 20,
    color: "#623d85",
    fontWeight: "bold",
    alignItems: "center"
  },
  innerButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    marginTop: 7,
    fontWeight: "600"
  },
  outerView: {
    marginTop: -2,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 7,
    
  },
  pressable: {
    backgroundColor: "#8c6fb7",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  innerView: {
    padding: 7,
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    color: "#fff",
  },
  iconView: {
    width: 35,
    height: 35,
    borderBottomRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  }
})