import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import FeedScreen from "../src/screen/FeedScreen"
import CourseScreen from '../src/screen/CourseScreen'
import TaskScreen from '../src/screen/TaskScreen'
import MessageScreen from '../src/screen/MessageScreen'
import ProfileScreen from '../src/screen/ProfileScreen'
 
const Tab = createBottomTabNavigator(); 

const Tabs = () => {
    return(
        <Tabs.Navigator>
            <Tabs.screen name = "Feed" component={FeedScreen} />
            <Tabs.screen name = "Course" component={CourseScreen} />
            <Tabs.screen name = "Task" component={TaskScreen} />
            <Tabs.screen name = "Message" component={MessageScreen} />
            <Tabs.screen name = "Profile" component={ProfileScreen} />
        </Tabs.Navigator>
    );
}
 
export default Tabs;