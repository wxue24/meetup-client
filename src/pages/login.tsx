import React, { useState } from "react";
import { View, Text } from "react-native";
import { login, switchAuthScreen } from "../redux/actions/userActions";
import LoginForm from "../components/LoginForm";
import NavLink from "../components/NavLink";
import Loading from "../components/Loading";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

interface Props {
  login: (email: string, password: string) => void;
  errors: loginErrors;
}
const loginScreen = ({ login, errors }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }: loginData) => {
    setLoading(true);
    await login(email, password);
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
        onPress={switchAuthScreen}
      />
      <Loading animating={loading} />
    </View>
  );
};

//TODO add typing for redux state
const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated,
  errors: state.user.errors,
});

const mapDispatchToProps = {
  login,
  switchAuthScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(loginScreen);
