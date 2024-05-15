import React, { useState, useEffect } from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker';

const UploadAssigmentScreen = () => {
    const navigation = useNavigation();

    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [courseId, setCourseId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [assignmentDescription, setAssignmentDescription] = useState("");
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleUpload = async () => {
        if (!selectedCourse || !assignmentTitle || !assignmentDescription) {
            alert("Please fill all fields and select a course.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/assignments', {
                AssigmentTitle: assignmentTitle,
                AssigmentDescription: assignmentDescription,
                CourseID: selectedCourse,
                AssigmentDueDate: dueDate.toISOString(),
            });
            alert('Assignment successfully uploaded.');
            // Optionally reset state here
            setAssignmentTitle('');
            setAssignmentDescription('');
            setSelectedCourse('');
            setDueDate(new Date()); // Reset to current date or a specific default

        } catch (error) {
            console.error('Failed to upload assignment:', error);
            alert('Failed to upload assignment.');
        }
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

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDueDate(selectedDate);
        }
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

            <Picker
                selectedValue={selectedCourse}
                onValueChange={(itemValue) => setSelectedCourse(itemValue)}
                style={{ width: '100%', height: 44, zIndex: 999, marginBottom: 200 }}>
                <Picker.Item label="Select a course" value="" />
                {courses.map((course) => (
                    <Picker.Item key={course.CourseID} label={course.CourseName} value={course.CourseID} />
                ))}
            </Picker>


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
            <TouchableOpacity onPress={showDatePickerModal} style={styles.datePickerButton}>
                <Text style={styles.datePickerText}>Select Due Date: {dueDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}


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
        top: 50,
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
    picker: {
        width: "80%",
        height: 44,
        marginBottom: 20,
    },
    datePickerButton: {
        padding: 10,
        backgroundColor: "#eeeeee",
        borderRadius: 5,
    },
    datePickerText: {
        fontSize: 16,
    },
});

export default UploadAssigmentScreen;