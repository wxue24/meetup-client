import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default Loading = ({ animating }) => {
  return <ActivityIndicator animating={animating} size="large" />;
};
