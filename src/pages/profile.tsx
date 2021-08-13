import { Button } from "native-base";
import React from "react";
import { View, Text } from "react-native";
import { signOut } from "../redux/actions/userActions";
import { useAppDispatch } from "../redux/hooks";

const profile = () => {
  const dispatch = useAppDispatch();

  return (
    <View>
      <Button
        onPress={() => {
          dispatch(signOut());
        }}
      >
        <Text>Sign out</Text>
      </Button>
    </View>
  );
};

export default profile;
