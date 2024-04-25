import CourseScreen from "../src/screen/CourseScreen";
import FeedScreen from "../src/screen/FeedScreen";
import TaskScreen from "../src/screen/TaskScreen";
import MessageScreen from "../src/screen/MessageScreen";
import ProfileScreen from "../src/screen/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tabs.Navigator>
            <Tab.Screen name="Courses" component = {CourseScreen} />
            <Tab.Screen name="Task" component = {TaskScreen} />
            <Tab.Screen name="Feed" component = {FeedScreen} />
            <Tab.Screen name="Messages" component = {MessageScreen} />
            <Tab.Screen name="Profile" component = {ProfileScreen} />
        </Tabs.Navigator>
    )
}

export default Tabs;