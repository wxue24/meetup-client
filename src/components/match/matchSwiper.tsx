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

interface Props {
  data: PublicData[]
}

const matchSwiper = ({data}: Props) => {
  return (
    <View>
      <View style={{ height: 400, width: 350, alignSelf: "center" }}>
        <DeckSwiper
          dataSource={data}
          renderItem={(item: PublicData) => (
            <Card style={{ elevation: 3 }} key={item.handle}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: item.avatar}} />
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

