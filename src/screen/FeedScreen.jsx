import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, TextInput, Linking, ActivityIndicator } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';


const FeedScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Context'ten kullanıcı bilgisini çekin
  const [commentText, setCommentText] = useState({}); // Use an object to manage multiple inputs

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/feed');

      const postsWithComments = await Promise.all(response.data.map(async post => {
        console.log(post, "postpostv")
        const commentsResponse = await axios.get(`http://localhost:8080/api/posts/${post.postID}/comments`);
        return { ...post, comments: commentsResponse.data };
      }));

      setPosts(postsWithComments);

      // setPosts(response.data.map(post => ({
      //   ...post,
      //   isLiked: false,
      //   likes: 0
      // })));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts().then(() => {
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    });
  };

  const handleLike = postId => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.postID === postId ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } : post
      )
    );
  };

  // const handleComment = (postId, comment) => {
  //   setPosts(prevPosts =>
  //     prevPosts.map(post =>
  //       post.id === postId ? { ...post, comments: comment } : post
  //     )
  //   );
  // };
  const handleAddComment = async (postId, content) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/posts/${postId}/comments`, {
        userID: user.id,
        content
      });
      if (response.status === 201) {
        // Add comment to the local state
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.postID === postId ? { ...post, comments: [...post.comments, response.data] } : post
          )
        );
        setCommentText(prev => ({ ...prev, [postId]: '' })); // Clear the input field
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const renderFileLink = (item) => {
    if (item.imageUrl) {
      const fileUri = item.imageUrl.startsWith('http') ? item.imageUrl : `http://localhost:8080/${item.imageUrl}`;
      const fileExtension = fileUri.split('.').pop();
      if (['docx', 'pdf'].includes(fileExtension)) {
        return (
          <TouchableOpacity onPress={() => Linking.openURL(fileUri)} style={styles.documentButton}>
            <Ionicons name="document-text" size={24} color="black" />
            <Text style={styles.linkText}>View Document: {fileExtension.toUpperCase()}</Text>
          </TouchableOpacity>
        );
      }
    }
  };

  const isImage = (url) => {
    const pattern = /\.(jpg|jpeg|png)$/i;
    return pattern.test(url);
  };


  const renderPost = ({ item }) => (
    <View style={styles.feedItem}>
      <Image source={require('../assets/USER.png')} style={styles.avatar} />
      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { user: item.userID })}>
              <Text style={styles.name}>{item.user.Username}</Text>
            </TouchableOpacity>
            <Text style={styles.timestamp}>{moment(item.timestamp).fromNow()}</Text>
          </View>
        </View>
        <Text style={styles.post}>{item.content}</Text>
        {item.imageUrl && isImage(item.imageUrl) && (
          <Image
            source={{ uri: item.imageUrl.startsWith('http') ? item.imageUrl : `http://localhost:8080/${item.imageUrl}` }}
            style={styles.postImage}
            resizeMode="contain"
          />
        )}
        {renderFileLink(item)}


        {item.comments && item.comments.map(comment => (
          <View style={styles.commentsContainer}>
            <Text key={comment.id} style={styles.comment}>{comment.content} - {comment.user?.Username}</Text>
          </View>

        ))}
        <View style={styles.commentInputContainer}>
          <View style={styles.inputAndIconContainer}>
            <TextInput
              onChangeText={(text) => setCommentText(prev => ({ ...prev, [item.postID]: text }))}
              value={commentText[item.postID] || ''}
              onSubmitEditing={() => handleAddComment(item.postID, commentText[item.postID])}
              placeholder="Add a comment..."
              style={styles.input}
            />
            <TouchableOpacity onPress={() => handleLike(item.postID, text)}>
              <Ionicons name={item.isLiked ? 'heart' : 'heart-outline'} size={24} color="#73788B" />
            </TouchableOpacity>
            <Text style={{ fontSize: 15, color: "#73788B", marginLeft: 10 }}>{item.likes}</Text>
          </View>
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
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </>

      ) : (
        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.postID.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

    </View>
  );
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
    marginTop: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#623d85",
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
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginVertical: 16,
  },
  dmButton: {
    position: 'absolute',
    right: 10,
    top: 40,
  },
  commentsContainer: {
    marginTop: 8,
    paddingLeft: 20, // Indent comments
    borderLeftWidth: 2,
    borderColor: "#EEE",
    marginLeft: 10,
  },
  comment: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  commentInputContainer: {
    marginTop: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },

  inputAndIconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // İçerikler arasında boşluk bırak
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10, // İkon ve input arasında boşluk
    paddingLeft: 10,
    borderRadius: 5,
  },
  documentButton: {
    flexDirection: 'row', // İç elemanları yan yana sıralar
    alignItems: 'center', // İç elemanları dikey eksen üzerinde ortalar
    marginBottom: 10,
    marginTop: 10,
  },
  linkText: {
    marginLeft: 10, // İkon ve metin arasında boşluk ekler
    fontSize: 16, // Metin boyutunu belirler
    color: 'black', // Metin rengini ayarlar
  },
});

export default FeedScreen;
