import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const UploadAssignment = () => {
  const navigation = useNavigation();

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");

  const handleUpload = () => {
    console.log(
      "Assignment Title:",
      assignmentTitle,
      "courseID:",
      courseId,
      "courseName:",
      courseName,
      "Assignment Description",
      assignmentDescription
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="keyboard-arrow-left" size={36} color="#623d85" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Upload Assignment</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Course ID"
        value={courseId}
        onChangeText={setCourseId}
      />

      <TextInput
        style={styles.input}
        placeholder="Course Name"
        value={courseName}
        onChangeText={setCourseName}
      />

      <TextInput
        style={styles.input}
        placeholder="Assignment Title"
        value={assignmentTitle}
        onChangeText={setAssignmentTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Assignment Description"
        value={assignmentDescription}
        onChangeText={setAssignmentDescription}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload Assignment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#623d85",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#623d85",
    marginBottom: 25,
    position: "absolute",
    top: 20,
    width: "100%",
  },
  backButton: {
    top: 5,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#623d85",
  },
});

export default UploadAssignment;
