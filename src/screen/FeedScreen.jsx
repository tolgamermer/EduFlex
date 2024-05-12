import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

posts = [
  {
    id: "1",
    name: "Mehmet Gassaloğlu",
    text: "My First EduFlex Post",
    timestamp: "2024-04-28T21:21Z",
    avatar: require("../assets/mehmet.jpg"),
    image: require("../assets/eduPost2.jpg"),
  },
  {
    id: "2",
    name: "Tolga Recep Mermer",
    text: "Hello World!",
    timestamp: "2024-04-28T21:15Z",
    avatar: require("../assets/tolga.jpg"),
    image: require("../assets/avatarTemp.jpg"),
  },
  {
    id: "3",
    name: "Mehmet Gassaloğlu",
    text: "Exciting News from the Capstone Project!🚀",
    timestamp: "2024-04-28T21:10Z",
    avatar: require("../assets/mehmet.jpg"),
    image: require("../assets/TempCaps.jpg"),
  },
];

export default class FeedScreen extends React.Component {
  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>

            <Ionicons name="reorder-three-outline" size={24} color="#73788B" />
          </View>

          <Text style={styles.post}>{post.text}</Text>

          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="contain"
          />

          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="heart-outline"
              size={24}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
            <Ionicons
              name="chatbox-ellipses-outline"
              size={24}
              color="#73788B"
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>

        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );
  }
}

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
});
