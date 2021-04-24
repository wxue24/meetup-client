import React from "react";
import { View, Text } from "react-native";

const UserProfile = (props) => {
  const handle = props.handle;
  // If viewing own profile, show ...
  // else show ...
  return (
    <View>
      <Text>{handle}</Text>
    </View>
  );
};

export default UserProfile;
