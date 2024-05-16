import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'


const CourseManagementScreen = () => {
    const navigation = useNavigation();

    const [selectedCourse, setSelectedCourse] = useState(null);

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);

    const handleCourseSelection = (courseID) => {
        setSelectedCourse(courseID);

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesResponse = await axios.get('http://localhost:8080/api/courses');
                setCourses(coursesResponse.data);

            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            console.log(selectedCourse, "selectedCourseselectedCourseselectedCourseselectedCourse")
            const fetchStudents = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/grades/course/${selectedCourse}`);
                    setStudents(response.data);
                    console.log(response, "responseresponseresponseresponseresponse")
                } catch (error) {
                    console.error(`Failed to fetch students for course ${selectedCourse}:`, error);
                }
            };
            fetchStudents();
        } else {
            setStudents([]); // Clear students list if no course is selected
        }
    }, [selectedCourse]);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={32} color="#623d85" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Course Management</Text>
            </View>

            {/* Checklist */}
            <View style={styles.checklistContainer}>
                <Picker
                    selectedValue={selectedCourse}
                    onValueChange={(itemValue) => setSelectedCourse(itemValue)}
                    style={{ width: '100%', height: 44, zIndex: 999, marginBottom: 200 }}>
                    <Picker.Item label="Select a course" value="" />
                    {courses.map((course) => (
                        <Picker.Item key={course.CourseID} label={course.CourseName} value={course.CourseID} />
                    ))}
                </Picker>
            </View>

            {/* Student */}
            <View style={styles.studentListContainer}>


           

            {selectedCourse && students.length > 0 ? (
                <FlatList
                    data={students}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.studentItem}>
                            <Text>{item.student.FirstName} - {item.student.LastName} : {item.Grade}</Text>

                        </View>
                    )}
                />
            ) : selectedCourse ? (
                <Text style={styles.noCourseText}>No records found.</Text>
            ) : (
                <Text style={styles.noCourseText}>Please select a course to view students.</Text>
            )}


        </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        marginTop: 50,
    },
    header: {
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#f0f0f0",
        flexDirection: "row",
        justifyContent: "center"
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#623d85"
    },
    checklistContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10,
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    backButton: {
        top: 5,
        marginRight: 15,
    },
    noCourseText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'grey',
        marginTop: 20,
    },
});

export default CourseManagementScreen;