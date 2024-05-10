import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import profilePic from '../assets/mehmet.jpg';

const PostScreen = ({ onPost, onAddImage, onAddDocument }) => {
  const [isSocialMediaPost, setIsSocialMediaPost] = useState(false);
  const [postText, setPostText] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.profilePic}
            source={profilePic}
          />
          <Text style={styles.userName}>What's On your mind?</Text>
          <TouchableOpacity style={styles.postButton} onPress={() => onPost(postText, isSocialMediaPost)}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.postInput}
          multiline
          numberOfLines={4}
          placeholder="Share your thoughts"
          onChangeText={setPostText}
        />
        <View style={styles.options}>
          <TouchableOpacity style={styles.iconButton} onPress={onAddImage}>
            <Icon name="image-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onAddDocument}>
            <Icon name="document-text-outline" size={24} color="black" />
          </TouchableOpacity>
        </View >
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Sharing Notes</Text>
          <Switch
            value={isSocialMediaPost}
            onValueChange={setIsSocialMediaPost}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  postInput: {
    height: 100,
    marginBottom: 10,
    padding: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  postButton: {
    backgroundColor: '#623d85',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  toggleLabel: {
    marginRight: 10,
  }
});

export default PostScreen;