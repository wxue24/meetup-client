import React from "react";
import { View } from "react-native";
import {
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Button,
  Text,
  Badge,
} from "native-base";
import { Feather } from "@expo/vector-icons";

const viewFriendRequests = () => {
  return (
    <Card>
      <CardItem>
        <Left>
          <Feather name="users" size={24} color="black" />
          <Badge
            style={{
              position: "absolute",
              left: 10,
              bottom: 10,
              width: 20,
              height: 20,
              zIndex: 1,
            }}
          >
            <Text style={{ fontSize: 10, zIndex: 2, position: "absolute" }}>
              {4}
            </Text>
          </Badge>
        </Left>
        <Right>
          <Body
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 10,
            }}
          >
            <Text style={{ width: 150 }}>New friend requests</Text>
            <Feather name="arrow-right" size={24} color="black" />
          </Body>
        </Right>
      </CardItem>
    </Card>
  );
};

export default viewFriendRequests;
