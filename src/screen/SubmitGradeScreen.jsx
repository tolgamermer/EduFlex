
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';

import { useNavigation } from "@react-navigation/native";

const studentsData = [
    { id: "1", courseID: "1", studentName: "Student 1" },
    { id: "2", courseID: "1", studentName: "Student 2" },
    { id: "3", courseID: "2", studentName: "Student 3" },
    { id: "4", courseID: "2", studentName: "Student 4" },
    { id: "5", courseID: "2", studentName: "Student 5" },
    { id: "6", courseID: "2", studentName: "Student 6" },
    { id: "7", courseID: "3", studentName: "Student 7" },
    { id: "8", courseID: "3", studentName: "Student 8" },
    { id: "9", courseID: "4", studentName: "Student 9" },
];

const SubmitGradeScreen = () => {
    const navigation = useNavigation();

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [studentGrades, setStudentGrades] = useState({});

    const handleGradeChange = (studentID, grade) => {
        setStudentGrades(prevGrades => ({
            ...prevGrades,
            [studentID]: grade
        }));
    };
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            const fetchStudents = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/courses/${selectedCourse}/users`);
                    setSelectedStudents(response.data);
                    console.log(response, "SELECTEDCOURSES")
                } catch (error) {
                    console.error('Failed to fetch students:', error);
                }
            };

            fetchStudents();
        }
    }, [selectedCourse]);

    const handleCourseSelection = (courseID) => {
        setSelectedCourse(courseID);
    };

    //     const handleSubmit = async () => {
    //         const gradesData = selectedStudents.map(student => ({
    //             StudentID: student.UserID,
    //             CourseID: selectedCourse,
    //             Grade: studentGrades[student.UserID] // TextInput'tan alınan puan
    //         }));
    // console.log("gradesDatagradesData",gradesData)
    //         try {
    //             const response = await axios.post('http://localhost:8080/api/grades', gradesData);
    //             Alert.alert('Success', 'Grades have been successfully submitted.');
    //             setStudentGrades({}); // Clear the grades after submission
    //         } catch (error) {
    //             console.error('Failed to submit grades:', error);
    //             Alert.alert('Error', 'Failed to submit grades.');
    //         }
    //     };

    const handleSubmit = async () => {
        const gradeEntries = Object.entries(studentGrades); // Anahtar-değer çiftlerini bir array olarak alır

        for (const [studentID, grade] of gradeEntries) {
            if (grade !== '') { // Not boş değilse gönder
                try {
                    const response = await axios.post('http://localhost:8080/api/grades', {
                        StudentID: studentID,
                        CourseID: selectedCourse,
                        Grade: grade
                    });
                    console.log('Grade submitted successfully:', response.data);
                } catch (error) {
                    console.error('Failed to submit grade for student ' + studentID, error);
                }
            }
        }

        Alert.alert('Grades Saved!', 'All student grades have been successfully saved.');
        setStudentGrades({}); // Tüm notları temizle
    };




    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="keyboard-arrow-left" size={32} color="#623d85" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Grade Entry</Text>
            </View>

            {/* Checklist */}
            {/* <ScrollView
                horizontal
                style={styles.checklistContainer}
            >
                {courses.map((course) => (
                    <TouchableOpacity
                        key={course.CourseID}
                        style={[
                            styles.checklistItem,
                            selectedCourse === course.id && styles.selectedItem,
                        ]}
                        onPress={() => handleCourseSelection(course.CourseID)}
                    >
                        <Text>{course.CourseName}</Text>
                    </TouchableOpacity>
                ))}
                </ScrollView> */}


            <Picker
                onPress={() => handleCourseSelection(course.CourseID)}
                selectedValue={selectedCourse}
                onValueChange={(itemValue) => setSelectedCourse(itemValue)}
                style={{ width: '100%', height: 44, zIndex: 999, marginBottom: 150 }}>
                <Picker.Item label="Select a course" value="" />
                {courses.map((course) => (
                    <Picker.Item key={course.CourseID} label={course.CourseName} value={course.CourseID} />
                ))}
            </Picker>


            {/* Student List */}
            <View style={styles.studentListContainer}>
                {/* <FlatList
                    data={selectedStudents}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.studentItem}>
                            <Text>{item.Username}</Text>
                            <TextInput
                                style={styles.gradeInput}
                                placeholder="Grade"
                                keyboardType="numeric"
                                value={studentGrades[item.id]}
                                onChangeText={(grade) => handleGradeChange(item.id, grade)}
                            />
                        </View>
                    )}
                /> */}
                <FlatList
                    data={selectedStudents}
                    keyExtractor={(item) => item.UserID.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.studentItem}>
                            <Text>{item.Username}</Text>
                            <TextInput
                                style={styles.gradeInput}
                                placeholder="Grade"
                                keyboardType="numeric"
                                value={studentGrades[item.UserID] || ''}
                                onChangeText={(grade) => handleGradeChange(item.UserID, grade)}
                            />
                        </View>
                    )}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        marginTop: 20,
    },
    header: {
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#f0f0f0",
        flexDirection: "row",
        justifyContent: "center",
        top: 20
    },
    headerText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#623d85",
    },
    // checklistContainer: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     paddingHorizontal: 20,
    //     marginTop: 10,
    // },
    checklistContainer: {
        flexDirection: 'row',

    },
    checklistItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    selectedItem: {
        backgroundColor: "#d3d3d3",
    },
    studentListContainer: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    studentItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    gradeInput: {
        width: 100,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    submitButton: {
        backgroundColor: "#623d85",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        marginHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 30,
    },
    submitButtonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 15
    },
});

export default SubmitGradeScreen;