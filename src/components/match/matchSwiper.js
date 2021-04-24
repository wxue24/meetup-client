import React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
} from "native-base";

const cards = [
  {
    firstName: "Donald",
    handle: "trump123",
    avatar: require("../../assets/pictures/trump.jpg"),
    grade: 11,
    school: "Claremont High",
    interests: [
      { name: "Soccer", type: "team_sports", code: "001" },
      { name: "Basketball", type: "team_sports", code: "002" },
      { name: "Badminton", type: "team_sports", code: "003" },
    ],
  },
  {
    firstName: "Joe",
    handle: "biden123",
    avatar: require("../../assets/pictures/biden.jpg"),
    grade: 11,
    school: "Pomona High",
    interests: [
      { name: "Guitar", type: "music", code: "101" },
      { name: "Piano", type: "music", code: "102" },
    ],
  },
];

const matchSwiper = ({interest, proximity, recommended}) => {
  return (
    <View>
      <View style={{ height: 400, width: 350, alignSelf: "center" }}>
        <DeckSwiper
          dataSource={cards}
          renderItem={(item) => (
            <Card style={{ elevation: 3 }} key={item.handle}>
              <CardItem>
                <Left>
                  <Thumbnail source={item.avatar} />
                  <Body>
                    <Text>{item.firstName}</Text>
                    <Text note>{item.handle}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem
                cardBody
                style={{ flexDirection: "column", height: 300, padding: 10 }}
              >
                <Text style={{ alignSelf: "flex-start" }}>Interests</Text>
                {item.interests.map((i) => {
                  return (
                    <Text style={{ height: 30 }} key={i.name}>
                      {i.name}
                    </Text>
                  );
                })}
              </CardItem>
            </Card>
          )}
        />
      </View>
    </View>
  );
};

export default matchSwiper;

const styles = StyleSheet.create({});
