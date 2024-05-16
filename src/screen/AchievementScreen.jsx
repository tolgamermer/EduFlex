import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const AchievementScreen = ({ navigation }) => {
    const [studentId1, setStudentId1] = useState('');
    const [studentId2, setStudentId2] = useState('');
    const [studentId3, setStudentId3] = useState('');
    const [studentId4, setStudentId4] = useState('');
    const [selectedAchievement, setSelectedAchievement] = useState('');

    const handleAchievementSelection = (achievementName) => {
        setSelectedAchievement(achievementName);
    };

    const handleSubmit = async () => {
        const studentIds = [studentId1, studentId2, studentId3, studentId4];
      console.log(studentIds,selectedAchievement,"studentIdsstudentIdsstudentIdsstudentIdsstudentIdsstudentIds")
   
            console.log(selectedAchievement,studentIds.find(id => id !== ''),"sdjkadfjkasjkfdjasdfkjadsjkfajs")
        try {
            const response = await axios.post('http://localhost:8080/api/achievement', {
                UserID: studentIds.find(id => id !== ''),
                AchievementName: selectedAchievement,
                Description: '',
                DateEarned: new Date().toISOString().split('T')[0] // Bugünün tarihi
            });

            Alert.alert('Successful', 'Achievement added successfully.');
        } catch (error) {
            Alert.alert('Hata', 'Başarı eklenirken bir hata oluştu.');
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={30} color="#623d85" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Provide Achievement</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, styles.buttonStart, { height: 100, width: 100 }]}
                        onPress={() => handleAchievementSelection('Consistency Champ')}
                    >
                        <View style={styles.innerButton}>
                            <Image source={require('../assets/badge.png')} style={styles.avatar} />
                        </View>
                        <Text style={styles.buttonText}>Consistency Champ</Text>
                    </Pressable>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Provide student id"
                    value={studentId1}
                    onChangeText={setStudentId1}
                />

                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, styles.buttonEnd, { height: 100, width: 100 }]}
                        onPress={() => handleAchievementSelection('Helpful Hero')}
                    >
                        <View style={styles.innerButton}>
                            <Image source={require('../assets/goal.png')} style={styles.avatar} />
                        </View>
                        <Text style={styles.buttonText}>Helpful Hero</Text>
                    </Pressable>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Provide student id"
                    value={studentId2}
                    onChangeText={setStudentId2}
                />

                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, styles.buttonEnd, { height: 100, width: 100 }]}
                        onPress={() => handleAchievementSelection('Note-Taking Ninja')}
                    >
                        <View style={styles.innerButton}>
                            <Image source={require('../assets/ninja.png')} style={styles.avatar} />
                        </View>
                        <Text style={styles.buttonText}>Note-Taking Ninja</Text>
                    </Pressable>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Provide student id"
                    value={studentId3}
                    onChangeText={setStudentId3}
                />

                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, styles.buttonEnd, { height: 100, width: 100 }]}
                        onPress={() => handleAchievementSelection('Feedback Fanatic')}
                    >
                        <View style={styles.innerButton}>
                            <Image source={require('../assets/feedback.png')} style={styles.avatar} />
                        </View>
                        <Text style={styles.buttonText}>Feedback Fanatic</Text>
                    </Pressable>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Provide student id"
                    value={studentId4}
                    onChangeText={setStudentId4}
                />

                <View style={styles.submitButtonContainer}>
                    <Pressable style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
};

export default AchievementScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingTop: 35,
        paddingBottom: 16,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        paddingHorizontal: 16,
        top: 20,
    },
    headerTitle: {
        fontSize: 20,
        color: "#623d85",
        fontWeight: "bold",
        alignItems: "center",
        position: 'absolute', 
        left: 100, 
        top: 35
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        borderColor: '#623d85',
    },
    submitButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
    submitButton: {
        backgroundColor: '#623d85',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 16,
    },
});
