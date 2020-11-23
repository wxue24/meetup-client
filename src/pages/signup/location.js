import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal } from "react-native";
import { styles } from "../../styles/basicStyles";
import { connect, useSelector } from "react-redux";
import { addLocation, setErrors } from "../../redux/actions/userActions";
import * as Location from "expo-location";
import Loading from "../../components/Loading";

const locationScreen = (props) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const errors = useSelector((state) => state.user.errors);

  // Gets location and calls action "addLocation"
  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrors({ location: "Permission to access location was denied" });
    } else {
      setLoading(true);
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    }
  };

  useEffect(() => {
    const add = async (lat, long) => {
      return await props.addLocation(lat, long);
    };

    if (location) {
      const addedLocation = add(
        location.coords.latitude,
        location.coords.longitude
      );
      setLoading(false);
      if (addedLocation) props.navigation.navigate("Social Media");
    }
  }, [location]);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.modalView}>
          <Loading animating={loading} />
        </View>
      </Modal>
      <Text>We need your location to provide recommendations </Text>
      <Button title="Get Location" onPress={getLocation} />
      {errors ? (
        <Text style={styles.errorMessage}>{errors.location}</Text>
      ) : null}
    </View>
  );
};

const mapDispatchToProps = {
  addLocation,
  setErrors,
};

export default connect(null, mapDispatchToProps)(locationScreen);
