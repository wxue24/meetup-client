import React from "react";
import { ActivityIndicator } from "react-native";

interface Props {
  animating: boolean;
}

const Loading = ({ animating }: Props) => {
  return <ActivityIndicator animating={animating} size={96} color="#0000ff" />;
};

export default Loading;