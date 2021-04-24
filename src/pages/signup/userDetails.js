import React, {useEffect} from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setProfile, setAuthenticated } from "../../redux/actions/userActions";
import ProfileForm from "../../components/ProfileForm";


const userDetailsScreen = (props) => {

  useEffect(
    () =>
      props.navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
      }),
    [props.navigation]
  );

  return (
    <View>
      <ProfileForm
        setProfile={props.setProfile}
        navigate={props.setAuthenticated}
        generalErrors={props.errors}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.user.errors
});

const mapDispatchToProps = {
  setProfile,
  setAuthenticated,
};

userDetailsScreen.propTypes = {
  errors: PropTypes.object.isRequired,
  setProfile: PropTypes.func.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(userDetailsScreen);
