import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Friend from "../components/friends/friend";

// Test data
import fr from "../utils/testFriends";

const friendRequestsScreen = () => {
  const [requests, SetRequests] = useState<FriendData[]>([]);

  const renderItem = ({ item }: any) => {
    return (
      <Pressable>
        <Friend data={item} isFriend={false} navigateToUser={() => {}} />
      </Pressable>
    );
  };

  useEffect(() => {
    //TODO Fetch friend requests
    SetRequests(fr);
  }, []);

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
