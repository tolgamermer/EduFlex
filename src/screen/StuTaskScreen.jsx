import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext';


const TaskScreen = () => {
    const { user } = useAuth(); // Context'ten kullanıcı bilgisini çekin
    const navigation = useNavigation();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/courses/${user.id}/assignments`);
                if (response.data && response.data.length > 0) {
                    const formattedAssignments = response.data.flatMap(item =>
                        item.course.assignments.map(assignment => ({
                            ...assignment,
                            CourseName: item.course.CourseName,
                            CourseCode: item.course.CourseCode,
                            CourseDesc: item.course.CourseDesc
                        }))
                    );
                    setAssignments(formattedAssignments);
                }
            } catch (err) {
                console.error('Failed to fetch assignments:', err);
            }
        };

        fetchAssignments();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}> Tasks </Text>
            </View>
            <View style={styles.outerView}>
                {assignments.map((task, index) => (
                    <TouchableOpacity key={index} style={styles.pressable} onPress={() => navigation.navigate('TaskDetailScreen', { task })}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text style={styles.title}>{task.CourseCode} - {task.AssigmentTitle}</Text>
                            <Text style={styles.description}>{task.AssigmentDescription}</Text>
                            <Text style={styles.description}>Due: {new Date(task.AssigmentDueDate).toLocaleDateString()}</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={30} color="#623d85" />
                    </TouchableOpacity>
                ))}
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
    outerView: {
        marginTop: 0,
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7
    },
    pressable: {
        backgroundColor: "#D8BFD8",
        borderRadius: 6,
        padding: 30,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    description: {
        color: 'rgba(0, 0, 0, 0.5)', // semi-transparent text
    },
    innerView: {
        padding: 7,
        width: 45,
        height: 45,
        borderRadius: 7,
        backgroundColor: "white",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    iconView: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    }
})