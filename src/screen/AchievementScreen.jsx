
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity, TextInput, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const AchievementScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={30} color="#623d85" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}> Provide Achievement </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.buttonStart, { height: 100, width: 100 }]}>
                        <View style={styles.innerButton}>
                            <Image source={require('../assets/badge.png')} style={styles.avatar} />
                        </View>
                        <Text style={styles.buttonText}> Consistency Champ </Text>
                    </Pressable>
                </View>
                <TextInput style={styles.input} placeholder="Provide student id" />


                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.buttonEnd, { height: 100, width: 100 }]}>
                        <View style={styles.innerButton}>
                            <Image source={require('../assets/goal.png')} style={styles.avatar} />
                        </View>
                        <Text style={styles.buttonText}>Helpful Hero </Text>
                    </Pressable>
                </View>
                <TextInput style={styles.input} placeholder="Provide student id" />


                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.buttonEnd, { height: 100, width: 100 }]}>
                        <View style={styles.innerButton}>
                            <Image source={require('../assets/ninja.png')} style={styles.avatar} />
                        </View>
                        <Text style={styles.buttonText}> Note-Taking Ninja</Text>
                    </Pressable>
                </View>
                <TextInput style={styles.input} placeholder="Provide student id" />

                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.buttonEnd, { height: 100, width: 100 }]}>
                        <View style={styles.innerButton}>
                            <Image source={require('../assets/feedback.png')} style={styles.avatar} />
                        </View>
                        <Text style={styles.buttonText}> Feedback Fanatic </Text>
                    </Pressable>
                </View>
                <TextInput style={styles.input} placeholder="Provide student id" />

                <View style={styles.submitButtonContainer}>
                    <Pressable style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View >

    )
}

export default AchievementScreen

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', // Add this
        justifyContent: 'space-between', // Add this
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
        top:20,
    },
    headerTitle: {
        fontSize: 20,
        color: "#623d85",
        fontWeight: "bold",
        alignItems: "center",
        position: 'absolute', // Add this
        left: 100, // Add this
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
    submitButtonContainer: {
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
})  
