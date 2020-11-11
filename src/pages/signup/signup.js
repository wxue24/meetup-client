import React, { useState } from "react";
import { View, Text } from "react-native";
import { signup, switchAuthScreen } from "../../redux/actions/userActions";
import LoginForm from "../../components/LoginForm";
import NavLink from "../../components/NavLink";
import Loading from "../../components/Loading"
import { connect } from "react-redux";

const signupScreen = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password, confirmPassword, handle }) => {
    setLoading(true);
    const auth = await props.signup(email, password, confirmPassword, handle);
    setLoading(false);
    if (auth) {
      props.navigation.navigate("Phone");
    }
  };
 
  return (
    <View>
      <LoginForm
        signup={true}
        headerText="Hello new user"
        errors={props.errors}
        submitButtonText="Sign up"
        onSubmit={handleSubmit}
      />
      <NavLink
        text="Already have an account? Login"
        routeName="Login"
        onPress={switchAuthScreen}
      />
      <Loading animating={loading}/>
    </View>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  errors: state.user.errors,
});

const mapDispatchToProps = {
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(signupScreen);
