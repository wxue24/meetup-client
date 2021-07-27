import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {} from "../redux/actions/userActions";
import MatchSwipe from "../components/match/matchSwiper";
import { Container, Text, Button, Tab, Tabs, ScrollableTab } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const interests = [
  { name: "Soccer", type: "team_sports", code: "001" },
  { name: "Basketball", type: "team_sports", code: "002" },
  { name: "Badminton", type: "team_sports", code: "003" },
];

const match = (props) => {
  return (
    <ScrollView>
      <Text>Recommended</Text>
      <MatchSwipe />
      <Text>Closest</Text>
      <MatchSwipe />
      <Text>Search by Interest (TODO implement)</Text>
      <Tabs renderTabBar={() => <ScrollableTab tabStyle={{ color: "red" }} />}>
        {interests.map((item) => {
          return (
            <Tab heading={item.name} key={item.name}>
              <MatchSwipe interest={item}/>
            </Tab>
          );
        })}
      </Tabs>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  errors: state.user.errors,
});

const mapDispatchToProps = {};

match.propTypes = {
  errors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(match);
