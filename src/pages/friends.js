// List of friends and button to show friend requests
import React from "react";
import { View, Text, Pressable } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Friend from "../components/friends/friend";
import ViewFriendRequests from "../components/friends/viewFriendRequests";
import friends from "../utils/testFriends";

const friendsScreen = (props) => {
  const viewFriend = (handle) => {
    props.navigation.navigate("User", {
      handle,
    });
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => viewFriend(item.handle)}>
        <Friend
          data={item}
          isFriend={true}
          navigateToUser={() => viewFriend(item.handle)}
        />
      </Pressable>
    );
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          props.navigation.navigate("Friend Requests");
        }}
      >
        <ViewFriendRequests />
      </Pressable>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item) => item.handle}
      />
    </View>
  );
};

export default friendsScreen;
