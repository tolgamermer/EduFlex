import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute, useNavigation } from '@react-navigation/native';
import MehmetAvatar from '../assets/mehmet.jpg';
import { Ionicons } from '@expo/vector-icons';


const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userName = route.params.userName; // Assuming userName is passed as a param

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: MehmetAvatar,
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Mehmet Gassaloglu',
          avatar: '.../aseets/mehmet.jpg', // Use the imported avatar image
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.BackButton} onPress={() => navigation.navigate('MessageScreen')}>
            <Ionicons name="arrow-back-outline" size={24} color="#73788B" />
          </TouchableOpacity>
        <Text style={styles.headerTitle}>{userName}</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};



export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    color: "black",
    fontWeight: "bold",
    alignItems: "center"
  },
  BackButton: {
    position: 'absolute',
    left: 15,
    top: 40,
  }
});