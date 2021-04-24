import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavLink = ({ text, routeName, onPress }) => {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        onPress={() => {
          onPress();
          navigation.navigate(routeName);
        }}
      >
        <Text style={styles.link}>{text}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
});

export default NavLink;
