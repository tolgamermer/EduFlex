import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

// Sample data for profile checklist
const checklistData = [
  { id: "1", name: "MY POSTS" },
  { id: "2", name: "MY GRADES" },
];

// Sample data for posts and grades
const postsData = [
  { id: "1", title: "Post 1", content: "This is the content of post 1." },
  { id: "2", title: "Post 2", content: "This is the content of post 2." },
  { id: "3", title: "Post 3", content: "This is the content of post 3." },
];


const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();

  const { params } = useRoute();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [gradeInfo, setGradeInfo] = useState(null);

  const { user } = useAuth();
  const handleEditScreen = () => {
    navigation.navigate("EditScreen");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleItemSelection = (itemID) => {
    fetchGradeInfo();
    setSelectedItem(itemID);
  };

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/user/${user?.id}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Kullanıcı bilgileri çekilemedi:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log(user?.id, "user?.id")
  useEffect(() => {
    if (user?.id) {
      fetchUserInfo();
    }
  }, [user?.id]);


  const fetchGradeInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/grades/${user?.id}`);
      setGradeInfo(response.data);
      console.log(response.data, "esponse.data")
    } catch (error) {
      console.error('Kullanıcı bilgileri çekilemedi:', error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => { fetchUserInfo(); }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!userInfo) {
    return <Text>Kullanıcı bilgisi bulunamadı.</Text>;
  }
  const handleFollow = () => {
    console.log('Follow user', params?.user, user?.id);
  };


  const renderContent = () => {
    if (selectedItem === "1") {
      // Render posts
      return (
        <FlatList
          data={postsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemContent}>{item.content}</Text>
            </View>
          )}
        />
      );
    } else if (selectedItem === "2" && userInfo?.Role === "Student") {
      // Render grades
      return (
        <FlatList
          data={gradeInfo}
          keyExtractor={(item) => item.course.CourseID}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.course.CourseCode} - {item.course.CourseName} </Text>
              <Text style={styles.itemContent}>Grade: {item.Grade}</Text>
            </View>
          )}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} showsVerticalScrollIndicator={false}>
        <Image style={styles.userImg} source={require("../assets/USER.png")} />
        <Text style={styles.userName}>{userInfo.Username}</Text>
        <Text style={styles.aboutUser}>{userInfo.UniversityInfo}</Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={styles.userBtn} onPress={handleEditScreen}>
            <Text style={styles.userBtnTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} >
            <Text style={styles.userBtnTxt} onPress={handleLogout}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInftoTitle}>22</Text>
            <Text style={styles.userInfoSubtitle}>Posts</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.userInftoTitle}>1000</Text>
            <Text style={styles.userInfoSubtitle}>Followers</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.userInftoTitle}>100</Text>
            <Text style={styles.userInfoSubtitle}>Following</Text>
          </View>
        </View>

        {/* Checklist */}
        <View style={styles.checklistContainer}>
          {checklistData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.checklistItem,
                selectedItem === item.id && styles.selectedItem,
              ]}
              onPress={() => handleItemSelection(item.id)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Render content based on selected item */}
        <View style={styles.contentContainer}>
          {renderContent()}
        </View>




      </ScrollView >
    </SafeAreaView >

  )
}

// <Text>Kullanıcı Adı: {userInfo.Username}</Text>
//       <Text>Email: {userInfo.Email}</Text>
//       <Text>Adı: {userInfo.FirstName}</Text>
//       <Text>Soyadı: {userInfo.LastName}</Text>
//       <Text>Üniversite Bilgisi: {userInfo.UniversityInfo}</Text>
//       <Text>Telefon: {userInfo.Phone}</Text>

export default ProfileScreen

const styles = StyleSheet.create({
  userInfoSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  userInftoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userBtnTxt: {
    color: "#2e64e5"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },

  checklistContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  checklistItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    margin: 5,
  },
  selectedItem: {
    backgroundColor: "#d3d3d3",
  },
  contentContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContent: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  }
});



