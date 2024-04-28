import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from "react-native";
import { useNavigation } from '@react-navigation/native';




  

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleEditScreen = () => {
    navigation.navigate("EditScreen");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
       <ScrollView style={styles.container} contentContainerStyle={{justifyContent: "center", alignItems: "center"}} showsVerticalScrollIndicator={false}>
        <Image style= {styles.userImg} source={require("../assets/tolga.jpg")} />
        <Text style={styles.userName}>Tolga Recep Mermer</Text>
        <Text style={styles.aboutUser}>4th grade in the Software Engineering Department of Bahcesehir University</Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={styles.userBtn} >
            <Text style={styles.userBtnTxt} onPress={handleEditScreen}>Edit</Text>
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



       </ScrollView>
    </SafeAreaView>
   
  )
}

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
  }
});