import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


// Dummy data
const tasks = [
    { title: 'HUK1005 - Midterm', description: 'Prepare to demonstrate your comprehension of the first 8 weeks material in our upcoming online midterm.' },
    { title: 'SEN4992 - Final Report', description: 'FINAL REPORT will be submitted in pdf format. (Please submit the same file to TURNITIN assignment.)' },
    // Add more tasks as needed
]

const TaskScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}> Tasks </Text>
            </View>
            <View style={styles.outerView}>
                {tasks.map((task, index) => (
                    <Pressable key={index} style={styles.pressable}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text style={styles.title}>{task.title}</Text>
                            <Text style={styles.description}>{task.description}</Text>
                        </View>
                        <View style={styles.iconView}>
                            <Ionicons name="chevron-forward-outline" size={30} color="#623d85" />
                        </View>
                    </Pressable>
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