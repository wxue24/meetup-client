import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

//Redux
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";

//Screens
import resolveAuthScreen from "./src/pages/resolveAuth";
import editDetails from "./src/pages/editDetails";
import friendRequests from "./src/pages/friendRequests";
import friends from "./src/pages/friends";
import user from "./src/pages/user";
import loginScreen from "./src/pages/login";
import match from "./src/pages/match";
import profile from "./src/pages/profile";
import signupScreen from "./src/pages/signup/signup";
import phone from "./src/pages/signup/phone";
import location from "./src/pages/signup/location";
import socialMedia from "./src/pages/signup/socialMedia";
import userDetails from "./src/pages/signup/userDetails";
import { LogBox } from "react-native";
import { useAppSelector } from "./src/redux/hooks";

//TODO ignoring warning
LogBox.ignoreLogs(["Setting a timer"]);

type featherIconName = keyof typeof Feather.glyphMap;

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const FriendsStack = createStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator initialRouteName="Matches">
      <HomeStack.Screen name="Matches" component={match} />
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
      <FriendsStack.Screen name="Friend Requests" component={friendRequests} />
      <FriendsStack.Screen name="User" component={user} />
    </FriendsStack.Navigator>
  );
};

interface AuthProps {
  signedOut?: boolean;
}
const Auth = ({ signedOut }: AuthProps) => {
  return (
    //TODO initial route name login
    <AuthStack.Navigator initialRouteName={signedOut ? "Login" : "ResolveAuth"}>
      <AuthStack.Screen name="ResolveAuth" component={resolveAuthScreen} />
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
    <Tab.Navigator
      initialRouteName="Friends"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: featherIconName = "help-circle";

          if (route.name == "Home") iconName = "home";
          else if (route.name == "Profile") iconName = "settings";
          else if (route.name == "Friends") iconName = "users";

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const AppContainer = () => {
  //TODO: This could be causing use to hit login button twice
  const auth = useAppSelector((state) => state.user.authenticated);
  // if auth===true rehydrate state
  return (
    <NavigationContainer>
      {auth ? <Main /> : auth == false ? <Auth signedOut={true} /> : <Auth />}
    </NavigationContainer>
    // <NavigationContainer>
    //   <Auth />
    // </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
