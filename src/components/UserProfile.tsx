import React from "react";
import { View, Text } from "react-native";

interface Props {
  handle: string;
}
const UserProfile = ({ handle }: Props) => {
  // If viewing own profile, show ...
  // else show ...
  return (
    <View>
      <Text>{handle}</Text>
    </View>
  );
};

export default UserProfile;
