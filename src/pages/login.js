import React from "react";
import { View, Text } from "react-native";
import { login } from "../redux/actions/userActions";
import LoginForm from "../components/LoginForm";
import NavLink from "../components/NavLink";
import { connect } from "react-redux";

const signupScreen = (props) => {
  const handleSubmit = ({ email, password }) => {};

  return (
    <View>
      <LoginForm
        signup={false}
        headerText="Welcome back"
        errorMessage={props.errors.loginError}
        submitButtonText="Login"
        onSubmit={handleSubmit}
      />
      <NavLink text="Don't have an account? Signup" routeName="Signup" />
    </View>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  errors: state.user.errors,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(signupScreen);
