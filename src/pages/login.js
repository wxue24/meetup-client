import React, { useState } from "react";
import { View, Text } from "react-native";
import { login, switchAuthScreen } from "../redux/actions/userActions";
import LoginForm from "../components/LoginForm";
import NavLink from "../components/NavLink";
import Loading from "../components/Loading";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

const loginScreen = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    await props.login(email, password);
    setLoading(false);
  };

  return (
    <View>
      <LoginForm
        signup={false}
        headerText="Welcome back"
        errors={props.errors}
        submitButtonText="Login"
        onSubmit={handleSubmit}
      />
      <NavLink
        text="Don't have an account? Signup"
        routeName="Signup"
        onPress={switchAuthScreen}
      />
      <Loading animating={loading} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  errors: state.user.errors,
});

const mapDispatchToProps = {
  login,
  switchAuthScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(loginScreen);
