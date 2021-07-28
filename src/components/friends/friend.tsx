import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  Card,
  CardItem,
  Left,
  Body,
  Thumbnail,
  Right,
  Button,
} from "native-base";
// @ts-ignore
import UserAvatar from "react-native-user-avatar";

interface Props {
  data: FriendData;
  isFriend: boolean;
  navigateToUser: () => void;
}
const friend = ({data, isFriend, navigateToUser}: Props) => {
  const removeFriend = () => {};

  const addFriend = () => {};

  const viewFriend = () => {
    navigateToUser()
  };

  return (
    <Card>
      <CardItem>
        <Left>
          <UserAvatar
            size={100}
            name={data.firstName}
            src={data.avatar}
          />
          <Thumbnail source={{uri: data.avatar}} />
          <Body>
            <Text>{data.firstName}</Text>
            <Text>{data.handle}</Text>
          </Body>
        </Left>
        <Right>
          <Body
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "center",
            }}
          >
            {isFriend ? (
              <Button
                bordered
                style={{
                  height: "60%",
                  alignSelf: "center",
                  paddingHorizontal: 10,
                }}
                onPress={viewFriend}
              >
                <Text>View</Text>
              </Button>
            ) : (
              <Button
                bordered
                style={{
                  height: "60%",
                  alignSelf: "center",
                  paddingHorizontal: 10,
                }}
                onPress={addFriend}
              >
                <Text>Add</Text>
              </Button>
            )}
            <Button
              style={{
                height: "60%",
                alignSelf: "center",
                paddingHorizontal: 10,
              }}
              onPress={removeFriend}
            >
              <Text>Remove</Text>
            </Button>
          </Body>
        </Right>
      </CardItem>
    </Card>
  );
};

export default friend;
