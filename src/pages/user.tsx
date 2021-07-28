import React, { useEffect } from "react";
import { View, Text } from "react-native";
import UserProfile from "../components/UserProfile";

interface Props {
  route: any;
}

const userScreen = ({ route }: Props) => {
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
