import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

const profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  filterSettings: state.filterSettings,
  firstName: state.firstName,
  grade: state.grade,
  handle: state.handle,
  interests: state.interests,
  school: state.school,
  location: state.location,
  socialMediaHandles: state.socialMediaHandles,
});

export default connect(mapStateToProps)(profile);
