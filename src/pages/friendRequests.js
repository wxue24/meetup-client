import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Friend from "../components/friends/friend";
import requests from "../utils/testFriends";

const friendRequestsScreen = (props) => {
  const renderItem = ({ item }) => {
    return (
      <Pressable>
        <Friend data={item} isFriend={false} />
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.handle}
      />
    </View>
  );
};

export default friendRequestsScreen;
