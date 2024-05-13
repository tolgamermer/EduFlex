import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const postsData = [
  {
    id: "1",
    name: "Mehmet Gassaloğlu",
    text: "My First EduFlex Post",
    timestamp: "2024-04-28T21:21Z",
    avatar: require('../assets/mehmet.jpg'),
    image: require('../assets/eduPost2.jpg')
  },
  {
    id: "2",
    name: "Tolga Recep Mermer",
    text: "Hello World!",
    likes: 300,
    timestamp: "2024-04-28T21:15Z",
    avatar: require('../assets/tolga.jpg'),
    image: require('../assets/avatarTemp.jpg')
  },
  {
    id: "3",
    name: "Mehmet Gassaloğlu",
    text: "Exciting News from the Capstone Project!🚀",
    timestamp: "2024-04-28T21:10Z",
    avatar: require('../assets/mehmet.jpg'),
    image: require('../assets/TempCaps.jpg')
  },
];

const FeedScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState(postsData.map(post => ({ ...post, isLiked: false, likes: 0 })));

  const handleLike = postId => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId, comment) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, comments: comment } : post
      )
    );
  };

  const getLikeIcon = postId => {
    const post = posts.find(post => post.id === postId);
    return post.isLiked ? 'heart' : 'heart-outline';
  };

  const [commentText, setCommentText] = useState('');

  const renderPost = post => (
    <View style={styles.feedItem}>
      <Image source={post.avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={styles.name}>{post.name}</Text>
            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
          </View>
        </View>
        <Text style={styles.post}>{post.text}</Text>
        <Image source={post.image} style={styles.postImage} resizeMode="contain" />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => handleLike(post.id)}>
            <Ionicons name={getLikeIcon(post.id)} size={24} color="#73788B" style={{ marginRight: 5 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 15, color: "#73788B", marginRight: 10 }}>{post.likes}</Text>
          <TouchableOpacity onPress={() => handleComment(post.id, text)}>
            <Ionicons name="chatbox-ellipses-outline" size={24} color="#73788B" />
          </TouchableOpacity>
          <TextInput

            onChangeText={text => handleComment(post.id, text)}
            value={post.comments}
            placeholder="Add a comment..."
            style={{ borderColor: '#000', padding: 10, height: 35, marginTop: -3 }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
        <TouchableOpacity style={styles.dmButton} onPress={() => navigation.navigate('MessageScreen')}>
          <Ionicons name="mail-outline" size={24} color="#73788B" />
        </TouchableOpacity>
      </View>

      <FlatList style={styles.feed}
        data={posts}
        renderItem={({ item }) => renderPost(item)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  );
};

FeedScreen.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
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
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: "#623d85",
    fontWeight: "bold",
    alignItems: "center",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 0,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
  dmButton: {
    position: 'absolute',
    right: 10,
    top: 40,
  }


})


export default FeedScreen;
