import React, { useEffect } from "react";
import { tryLocalLogin } from "../redux/actions/userActions";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

const resolveAuth = (props) => {
  useEffect(() => {
    tryLocalLogin();
  }, []);

  const auth = useSelector((state) => state.user.authenticated);

  useEffect(() => {
    if (!auth) {
      props.navigation.navigate("Login");
    }
  }, [auth]);

  return <ActivityIndicator animating={true} />;
};

export default resolveAuth;
