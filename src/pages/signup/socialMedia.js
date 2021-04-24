import React, { useState, useEffect } from "react";
import { View, Button, Text, Modal } from "react-native";
import { connect } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, startAsync } from "expo-auth-session";
import { styles } from "../../styles/basicStyles";
import {
  getInstagramHandle,
  addInstagramHandle,
} from "../../redux/actions/userActions";
import Loading from "../../components/Loading";

WebBrowser.maybeCompleteAuthSession();

const client_id = 697420227552133;
const redirectURI = makeRedirectUri({ useProxy: true });
const scope = "user_profile,user_media";
const site =
  `https://api.instagram.com/oauth/authorize?client_id=${client_id}` +
  `&redirect_uri=${redirectURI}` +
  `&scope=${scope}` +
  `&response_type=code`;

const socialMediaScreen = (props) => {
  const [response, setResponse] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    const res = await startAsync({ authUrl: site });
    setResponse(res);
  };

  const handleAdd = async () => {
    if (props.handle) {
      setLoading(true);
      await props.addInstagramHandle(props.handle);
      setLoading(false);
      if (!props.errors.instagram) {
        props.navigation.navigate("User Details");
        setLoggedIn(false);
      }
    } else console.log("No username to add");
  };

  useEffect(() => {
    const getHandleWithCode = async (code) => {
      await props.getInstagramHandle(code);
    };
    if (response?.type === "success") {
      //Auth code
      const { code } = response.params;
      setLoading(true);
      getHandleWithCode(code);
      setLoading(false);
    }
  }, [response]);

  useEffect(() => {
    if (props.handle) setLoggedIn(true);
  }, [props.handle]);

  useEffect(
    () =>
      props.navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [props.navigation]
  );

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={loggedIn}>
        <View style={styles.modalView}>
          {props.handle ? (
            <Text>{`Username: ${props.handle}`}</Text>
          ) : (
            <Text>
              Error, please close this window and try logging in again
            </Text>
          )}
          {props.errors.instagram ? (
            <Text style={styles.errorMessage}>{errors.instagram}</Text>
          ) : null}
          <Button title="Add username to Meetup" onPress={() => handleAdd()} />
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.modalView}>
          <Loading animating={loading} />
        </View>
      </Modal>
      {props.errors.instagram ? (
        <Text style={styles.errorMessage}>{errors.instagram}</Text>
      ) : null}
      <Button title="Connect to Instagram" onPress={() => handleConnect()} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.user.errors,
  handle: state.user.socialMediaHandles.instagram,
});

const mapDispatchToProps = {
  getInstagramHandle,
  addInstagramHandle,
};

export default connect(mapStateToProps, mapDispatchToProps)(socialMediaScreen);
