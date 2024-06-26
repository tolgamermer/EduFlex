import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, PermissionsAndroid, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { Linking, Alert } from 'react-native';

const TaskScreen = () => {
  const navigation = useNavigation();

  const handleUploadAssignment = () => {
    navigation.navigate("UploadAssigmentScreen");
  };

  const handleCourseManagment = () => {
    navigation.navigate("CourseManagmentScreen");
  }

  const handleCreateLecture = () => {
    navigation.navigate("CreateLectureScreen");
  }
  const handleManageStudent = () => {
    navigation.navigate("ManageStudentScreen");
  }
  const handleSubmitGrade = () => {
    navigation.navigate("SubmitGradeScreen");
  }

  const handleAchievement = () => {
    navigation.navigate("AchievementScreen");
  }
  const openFile = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open file.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('An error occurred', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Instructor Management Screen </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleCourseManagment} style={[styles.button, styles.buttonStart]}>
          <View style={styles.innerButton}>
            <Ionicons name="library-outline" size={30} color="#623d85" />
          </View>
          <Text style={styles.buttonText}> Course Managment </Text>
        </Pressable>
        <Pressable onPress={handleCreateLecture} style={[styles.button, styles.buttonEnd]}>
          <View style={styles.innerButton}>
            <Ionicons name="laptop-outline" size={30} color="#623d85" />
          </View>
          <Text style={styles.buttonText}> Create Online Lecture </Text>
        </Pressable>
      </View>
      <View style={styles.outerView}>
        <Pressable style={styles.pressable} onPress={handleSubmitGrade}  >
          <View style={styles.innerView}>
            <Ionicons name="newspaper-outline" size={30} color="#623d85" />
          </View>
          <Text style={styles.text}> Evaluation Entry</Text>
          <View style={styles.iconView}>
            <Ionicons name="chevron-forward-outline" size={30} color="#623d85" />
          </View>
        </Pressable>
        <Pressable style={styles.pressable} onPress={handleAchievement}>
          <View style={styles.innerView}>
            <Ionicons name="star-outline" size={30} color="#623d85" />
          </View>
          <Text style={styles.text}> Provide Achievement</Text>
          <View style={styles.iconView}>
            <Ionicons name="chevron-forward-outline" size={30} color="#623d85" />
          </View>
        </Pressable>
        <Pressable onPress={handleUploadAssignment} style={styles.pressable}>
          <View style={styles.innerView}>
            <Ionicons name="desktop-outline" size={30} color="#623d85" />
          </View>
          <Text style={styles.text}> Upload Assignment</Text>
          <View style={styles.iconView}>
            <Ionicons name="chevron-forward-outline" size={30} color="#623d85" />
          </View>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => openFile('http://localhost:8080/api/grades/download-report')}>
          <View style={styles.innerView}>
            <Ionicons name="pencil-outline" size={30} color="#623d85" />
          </View>
          <Text style={styles.text}> General Report</Text>
          <View style={styles.iconView}>
            <Ionicons name="chevron-forward-outline" size={30} color="#623d85" />
          </View>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.buttonStart]}>
          <View style={styles.innerButton}>
            <Ionicons name="calendar-outline" size={30} color="#623d85" />
          </View>
          <Text style={styles.buttonText}> Check Calender </Text>
        </Pressable>
        <Pressable onPress={handleManageStudent} style={[styles.button, styles.buttonEnd]}>
          <View style={styles.innerButton}>
            <Ionicons name="people-outline" size={30} color="#623d85" />
          </View>
          <Text style={styles.buttonText}> Manage Student </Text>
        </Pressable>
      </View>
    </View>

  )
}

export default TaskScreen

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
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  buttonStart: {
    marginEnd: 5
  },
  buttonEnd: {
    marginStart: 5
  },
  innerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    marginTop: 7,
    fontWeight: "600"
  },
  outerView: {
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7
  },
  pressable: {
    backgroundColor: "#D8BFD8",
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
    flex: 1
  },
  iconView: {
    width: 35,
    height: 35,
    borderBottomRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  }
})