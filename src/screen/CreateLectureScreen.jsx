import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const CreateLectureScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [course, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const { user } = useAuth();


  const handleCreateLecture = async () => {
    try {
      const formattedDate = date.toLocaleDateString('en-GB').split('/').reverse().join('-');
      const lectureData = {
        courseName: course,
        teacherID: user.id,
        courseCode: courseCode,
        courseDesc: description,
        lectureDate: date
      };
      console.log(lectureData, "lectureData")

      const response = await axios.post('http://localhost:8080/api/courses/lecture', lectureData);
      Alert.alert('Lecture Created', 'Your lecture has been created successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating new course:', error);
      Alert.alert('Error', 'There was an error creating the lecture.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={30} color="#623d85" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Create Online Lecture</Text>
        </View>

        <View style={styles.form}>

          <TextInput
            style={styles.input}
            placeholder="Course Name"
            value={course}
            onChangeText={setCourseName}
          />
          <TextInput
            style={styles.input}
            placeholder="Course Code"
            value={courseCode}
            onChangeText={setCourseCode}
          />
          <TextInput
            style={styles.input}
            placeholder="Lecture Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
            <Text style={styles.datePickerText}>
              {`Date: ${date.toLocaleDateString()}`}
            </Text>
          </TouchableOpacity>

          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />



          <TouchableOpacity onPress={handleCreateLecture} style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Lecture</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateLectureScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#623d85',
    right: -20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  datePickerButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
  },
  createButton: {
    backgroundColor: '#623d85',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
