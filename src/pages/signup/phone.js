import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../../styles/basicStyles";
import { connect } from "react-redux";
import { validatePhone, checkOTP } from "../../redux/actions/userActions";

const phone = (props) => {
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [phoneAttempts, setPhoneAttempts] = useState(0);
  const [OTPAttempts, setOTPAttempts] = useState(0);
  const [sentOTP, setSentOTP] = useState(false);
  const [phoneError, setPhoneError] = useState(null);
  const [OTPError, setOTPError] = useState(null);

  const handleSend = async () => {
    if (phoneAttempts > 3) {
      setPhoneError("Too many attempts please try later");
      return;
    }
    if (phone === "") {
      setPhoneError("Please enter a valid number");
      return;
    }
    await props.validatePhone(phone);
    if (props.validatedPhone) {
      setPhoneError(null);
      setPhoneAttempts(0);
      setSentOTP(true);
    } else {
      setPhoneAttempts(phoneAttempts + 1);
      setPhone("");
      setPhoneError(props.errors.phone);
    }
  };

  const handleCheck = async () => {
    if (OTPAttempts > 3) {
      setOTPError("Too many attempts, please try again later");
      return;
    }
    if (phone === "" || OTP === "") {
      setOTPError("Please enter valid phone and OTP");
      return;
    }
    if (!sentOTP) {
      setOTPError("Please send One Time Password first");
      return;
    }
    await props.checkOTP(phone, OTP);
    if (!errors) {
      props.navigation.navigate("Location");
    } else {
      setOTP("");
      setOTPError(props.errors.OTP);
      setOTPAttempts(OTPAttempts + 1)
    }
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
      {phoneError ? (
        <Text style={styles.errorMessage}>{phoneError}</Text>
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
      {OTPError ? <Text style={styles.errorMessage}>{OTPError}</Text> : null}
      <Button title="Check" onPress={handleCheck} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.user.errors,
  validatedPhone: state.user.phone,
});

const mapDispatchToProps = {
  validatePhone,
  checkOTP,
};

export default connect(mapStateToProps, mapDispatchToProps)(phone);
