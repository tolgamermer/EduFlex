//ManageStudent


import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ManageStudent = ({ navigation }) => {

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [checkedStudents, setCheckedStudents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [checked, setChecked] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesResponse = await axios.get('http://localhost:8080/api/courses');
                setCourses(coursesResponse.data);
                const studentsResponse = await axios.get('http://localhost:8080/api/auth/students');
                setStudents(studentsResponse.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);


    const handleStudentSelection = (userID) => {
        setCheckedStudents(checkedStudents.includes(userID)
            ? checkedStudents.filter(id => id !== userID)
            : [...checkedStudents, userID]);
    };

    const handleAdd = async () => {
        if (!selectedCourse || checkedStudents.length === 0) {
            alert("Please select a course and at least one student.");
            return;
        }
        try {
            console.log("fetch selectedCourse", selectedCourse, checkedStudents)
            const response = await axios.post(`http://localhost:8080/api/courses/${selectedCourse}/assign-users`, {
                userIds: checkedStudents,
                courseId: selectedCourse
            });
            alert('Students successfully assigned to the course.');
            setCheckedStudents([]);  // Clear selections after successful assignment
        } catch (error) {
            console.error('Failed to assign students:', error);
            alert('Failed to assign students.');
        }
    };


    const handleSelection = (id) => {
        if (checked.includes(id)) {
            setChecked(checked.filter((item) => item !== id));
        } else {
            setChecked([...checked, id]);
        }
    };

    const handleRemove = () => {
        setStudents(students.filter(student => !checked.includes(student.id)));
        setChecked([]); // Clear the selection
    };

    const handleSelectAll = () => {
        setChecked(students.map(student => student.UserID));
    };

    return (
        <View >
            <SafeAreaView>

                <ScrollView>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" size={30} color="#623d85" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}> Manage Students </Text>
                    </View>

                    <Picker
                        selectedValue={selectedCourse}
                        onValueChange={(itemValue) => setSelectedCourse(itemValue)}
                        style={{ width: '100%', height: 44, zIndex: 999, marginBottom: 150 }}>
                        <Picker.Item label="Select a course" value="" />
                        {courses.map((course) => (
                            <Picker.Item key={course.CourseID} label={course.CourseName} value={course.CourseID} />
                        ))}
                    </Picker>

                    <TextInput
                        style={styles.searchBar}
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Search students"
                    />

                    <View style={styles.container}>
                        <Text style={{ fontSize: 12 }} onPress={handleSelectAll}>Select All</Text>
                        <ScrollView style={styles.innerContainer}>

                            {students.filter(student => student.Username.toLowerCase().includes(searchText.toLowerCase())).map((student) => (
                                <TouchableOpacity key={student.UserID} onPress={() => handleStudentSelection(student.UserID)}>
                                    <View style={styles.itemContainer}>
                                        <RadioButton
                                            value={student.UserID}
                                            status={checkedStudents.includes(student.UserID) ? 'checked' : 'unchecked'}
                                            onPress={() => handleStudentSelection(student.UserID)}
                                        />
                                        <Text>{student.Username}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}

                        </ScrollView>

                    </View>
                    <View>
                        <TouchableOpacity style={[styles.iconContainer, styles.button]} onPress={() => {/* Your mark attendance logic here */ }}>
                            <Text style={styles.buttonText}>Mark attendance</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.iconContainer, styles.button]} onPress={handleAdd}>
                            <Text style={styles.buttonText}>Add to Course</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </SafeAreaView>
        </View >
    );
}

export default ManageStudent

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
    },
    headerTitle: {
        fontSize: 20,
        color: "#623d85",
        fontWeight: "bold",
        alignItems: "center",
        position: 'absolute',
        left: 120,
        top: 18
    },
    container: {
        height: Dimensions.get('window').height * 0.5, // set the height to 80% of the screen height
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 30
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#fff',
        margin: 10,
    },
    innerContainer: {
        flex: 1,
        padding: 10,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        paddingLeft: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        margin: 10,
    },
    button: {
        backgroundColor: '#623d85',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        flex: 1,
    },
})