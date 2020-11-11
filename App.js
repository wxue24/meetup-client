import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Redux
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";

//Firebase
import { auth } from "./src/firebase/config";

//Screens
import resolveAuthScreen from "./src/pages/resolveAuth";
import editDetails from "./src/pages/editDetails";
import friendRequests from "./src/pages/friendRequests";
import friends from "./src/pages/friends";
import loginScreen from "./src/pages/login";
import match from "./src/pages/match";
import profile from "./src/pages/profile";
import signupScreen from "./src/pages/signup/signup";
import phone from "./src/pages/signup/phone";
import location from "./src/pages/signup/location";
import socialMedia from "./src/pages/signup/socialMedia";
import userDetails from "./src/pages/signup/userDetails";
import { LogBox } from "react-native";

//TODO ignoring warning
LogBox.ignoreLogs(["Setting a timer"]);

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const FriendsStack = createStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={match} />
    </HomeStack.Navigator>
  );
};

const Profile = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={profile} />
      <ProfileStack.Screen name="Edit" component={editDetails} />
    </ProfileStack.Navigator>
  );
};

const Friends = () => {
  return (
    <FriendsStack.Navigator initialRouteName="Friends">
      <FriendsStack.Screen name="Friends" component={friends} />
      <FriendsStack.Screen name="FriendRequests" component={friendRequests} />
    </FriendsStack.Navigator>
  );
};

const Auth = () => {
  return (
    //TODO initial route name login
    <AuthStack.Navigator initialRouteName="Resolve Auth">
      <AuthStack.Screen name="Resolve Auth" component={resolveAuthScreen} />
      <AuthStack.Screen name="Login" component={loginScreen} />
      <AuthStack.Screen name="Signup" component={signupScreen} />
      <AuthStack.Screen name="Phone" component={phone} />
      <AuthStack.Screen name="Location" component={location} />
      <AuthStack.Screen name="SocialMedia" component={socialMedia} />
      <AuthStack.Screen name="UserDetails" component={userDetails} />
    </AuthStack.Navigator>
  );
};

const Main = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Friends" component={Friends} />
    </Tab.Navigator>
  );
};

export default function App() {
  // const auth = useSelector((state) => state.user.authenticated);
  // console.log(auth);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* {auth && <Main />}
        {!auth && <Auth />} */}
        <Auth />
      </NavigationContainer>
    </Provider>
  );
}
