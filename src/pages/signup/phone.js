import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../../styles/basicStyles";
import { connect } from "react-redux";
import { validatePhone, checkOTP } from "../../redux/actions/userActions";

const phone = (props) => {
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [validatePhoneAttempts, setValidatePhoneAttempts] = useState(0);
  const [validateOTPAttempt] = useState(false);
  const [error, setError] = useState(null);
  const errors = props.errors;

  const handleSend = () => {
    if (validatePhoneAttempts > 3) return;
    if (phone === "") return;

    props.validatePhone(phone);
    setValidatePhoneAttempts(validatePhoneAttempts + 1);
    setPhone("");
  };

  const handleCheck = () => {
    if (validateOTPAttempt === true) return;
    if (phone === "" || OTP === "") props.checkOTP(phone, OTP);
    setOTP("");
  };

  return (
    <View>
      <Text>Phone number</Text>
      <View style={styles.input}>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="number-pad"
        />
      </View>
      {errors && errors.phone ? (
        <Text style={styles.errorMessage}>{errors.phone}</Text>
      ) : null}
      <Button title="Send One-Time Password" onPress={handleSend} />
      <Text>One-Time Password</Text>
      <View style={styles.input}>
        <TextInput
          value={OTP}
          onChangeText={setOTP}
          keyboardType="number-pad"
        />
      </View>
      {errors && errors.OTP ? (
        <Text style={styles.errorMessage}>{errors.OTP}</Text>
      ) : null}
      <Button title="Check" onPress={handleCheck} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.user.errors,
});

const mapDispatchToProps = {
  validatePhone,
  checkOTP,
};

export default connect(mapStateToProps, mapDispatchToProps)(phone);
