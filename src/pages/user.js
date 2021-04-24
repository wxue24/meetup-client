import React, { useEffect } from "react";
import { View, Text } from "react-native";
import UserProfile from "../components/UserProfile";

const userScreen = ({ route }) => {
  const { handle } = route.params;

  useEffect(() => {
    // Get user data
  }, []);

  return (
    <View>
      <UserProfile handle={handle} />
    </View>
  );
};

export default userScreen;
