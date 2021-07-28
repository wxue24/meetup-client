import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {
  text: string;
  routeName: string;
  onPress: () => void;
}

const NavLink = ({ text, routeName, onPress }: Props) => {
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
