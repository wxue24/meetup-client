import React from "react";
import { ActivityIndicator } from "react-native";

export default Loading = ({ animating }) => {
  return <ActivityIndicator animating={animating} size={96} color="#0000ff" />;
};
