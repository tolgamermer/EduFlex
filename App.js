import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'


import SignUpScreen from './src/screen/SignUpScreen';
import LoginScreen from './src/screen/LoginScreen';


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgotPasswordScreen from './src/screen/ForgotPasswordScreen';

import FeedScreen from './src/screen/FeedScreen';
import CourseScreen from './src/screen/CourseScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import TaskScreen from './src/screen/TaskScreen';
import MessageScreen from './src/screen/MessageScreen';


import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditScreen from './src/screen/EditScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function HomeScreen () {
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
        component={MessageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square-o" size={36} color="#623d85" />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="tasks" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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
    
    <NavigationContainer>

      <Stack.Navigator screenOptions={{headerShown: false,}}>

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;



const styles = StyleSheet.create({})
