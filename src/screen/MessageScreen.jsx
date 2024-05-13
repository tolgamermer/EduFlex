import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';





const Messages = [
  {
    id: '1',
    userName: 'Mehmet Gassaloğlu',
    userImg: require('../assets/mehmet.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'Tolga Recep Mermer',
    userImg: require('../assets/tolga.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const MessageScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.BackButton} onPress={() => navigation.navigate('FeedScreen')}>
            <Ionicons name="arrow-back-outline" size={24} color="#73788B" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Messages</Text>
        </View>
        <FlatList
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.userInfo}>
                <View style={styles.userImgWrapper}>
                  <Image source={item.userImg} style={styles.userImg} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { userName: item.userName })}>
                  <View style={styles.textSection}>
                    <View style={styles.userInfoText}>
                      <Text style={styles.userName}>{item.userName}</Text>
                      <Text style={styles.postTime}>{item.messageTime}</Text>
                    </View>
                    <Text style={styles.messageText}>{item.messageText}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
    </View>
  );
}


export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 35,
    paddingBottom: 16,
    backgroundColor: "white",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerText: {
    fontSize: 20,
    color: "#623d85",
    fontWeight: "bold",
    alignSelf: "center"
  },
  BackButton: {
    position: 'absolute',
    left: -130,
    top: 40,
  },
 
  card: {
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333333'
  }
})