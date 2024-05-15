import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import SignUpScreen from './src/screen/SignUpScreen';
import LoginScreen from './src/screen/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordScreen from './src/screen/ForgotPasswordScreen';
import FeedScreen from './src/screen/FeedScreen';
import CourseScreen from './src/screen/CourseScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import TaskScreen from './src/screen/TaskScreen';
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditScreen from './src/screen/EditScreen';
import PostScreen from './src/screen/PostScreen';
import StuTaskScreen from './src/screen/StuTaskScreen';
import MessageScreen from './src/screen/MessageScreen';
import ChatScreen from './src/screen/ChatScreen';
import TaskDetailScreen from './src/screen/TaskDetailScreen';
import CourseDetails from './src/screen/CourseDetails';
import { AuthProvider } from './src/contexts/AuthContext';
import { useAuth } from './src/contexts/AuthContext';
import MyProfileScreen from './src/screen/MyProfileScreen';
import CourseManagmentScreen from './src/screen/CourseManagmentScreen';
import UploadAssigmentScreen from './src/screen/UploadAssigmentScreen';
import CreateLectureScreen from './src/screen/CreateLectureScreen';
import ManageStudentScreen from './src/screen/ManageStudentScreen';
import SubmitGradeScreen from './src/screen/SubmitGradeScreen';
import AchievementScreen from './src/screen/AchievementScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function HomeScreen() {
  const { user } = useAuth();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={FeedScreen}
        options={{

          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CourseScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookshelf" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square-o" size={36} color="#623d85" />
          ),
        }}
      />
      {user.Role === 'Teacher' ? (
        <Tab.Screen
          name="Tasks"
          component={TaskScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="tasks" size={24} color="black" />
            ),
          }}
        />) : (
        <Tab.Screen
          name="Tasks"
          component={StuTaskScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="tasks" size={24} color="black" />
            ),
          }}
        />)}
      <Tab.Screen
        name="Profile"
        component={MyProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <AuthProvider>

      <NavigationContainer>

        <Stack.Navigator screenOptions={{ headerShown: false, }}>

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="EditScreen" component={EditScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="MessageScreen" component={MessageScreen} />
          <Stack.Screen name="FeedScreen" component={HomeScreen} options={{ tabBarVisible: true }} />
          <Stack.Screen name="ChatScreen" component={ChatScreen}
            options={({ route }) => ({ title: route.params.userName })} />
          <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
          <Stack.Screen name="TaskScreen" component={HomeScreen} options={{ tabBarVisible: true }} />
          <Stack.Screen name="CourseDetails" component={CourseDetails} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: true, title: 'Profile' }} />
          <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} options={{ headerShown: true, title: 'My Profile' }} />
          <Stack.Screen name="CourseManagmentScreen" component={CourseManagmentScreen} />
          <Stack.Screen name="UploadAssigmentScreen" component={UploadAssigmentScreen} />
          <Stack.Screen name="CreateLectureScreen" component={CreateLectureScreen} />
          <Stack.Screen name="ManageStudentScreen" component={ManageStudentScreen} />
          <Stack.Screen name="SubmitGradeScreen" component={SubmitGradeScreen} />
          <Stack.Screen name="AchievementScreen" component={AchievementScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

export default App;



const styles = StyleSheet.create({})
