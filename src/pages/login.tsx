import React, { useState } from "react";
import { View, Text } from "react-native";
import { login } from "../redux/actions/userActions";
import LoginForm from "../components/LoginForm";
import NavLink from "../components/NavLink";
import Loading from "../components/Loading";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hooks";

interface Props {
  errors: loginErrors;
}
const loginScreen = ({ errors }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }: loginData) => {
    setLoading(true);
    await dispatch(login(email, password));
    setLoading(false);
  };

  return (
    <View>
      <LoginForm
        signup={false}
        headerText="Welcome back"
        errors={errors}
        submitButtonText="Login"
        onSubmit={handleSubmit}
      />
      <NavLink
        text="Don't have an account? Signup"
        routeName="Signup"
        onPress={() => {}} //TODO Switch to signup
      />
      <Loading animating={loading} />
    </View>
  );
};

export default loginScreen;
