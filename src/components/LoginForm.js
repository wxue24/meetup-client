import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { styles } from "../styles/basicStyles";

const LoginForm = ({
  headerText,
  errors,
  submitButtonText,
  onSubmit,
  signup,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  return (
    <View>
      <Text>{headerText}</Text>
      <Text>Email</Text>
      <View style={styles.input}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {errors && errors.email ? (
        <Text style={styles.errorMessage}>{errors.email}</Text>
      ) : null}
      <Text>Password</Text>
      <View style={styles.input}>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {errors && errors.password ? (
        <Text style={styles.errorMessage}>{errors.password}</Text>
      ) : null}
      {signup ? (
        <>
          <Text>Confirm Password</Text>
          <View style={styles.input}>
            <TextInput
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {errors && errors.confirmPassword ? (
            <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
          ) : null}
          <Text>Username</Text>
          <View style={styles.input}>
            <TextInput
              value={handle}
              onChangeText={setHandle}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {errors && errors.handle ? (
            <Text style={styles.errorMessage}>{errors.handle}</Text>
          ) : null}
        </>
      ) : null}
      {errors && errors.generalError ? (
        <Text style={styles.errorMessage}>{errors.generalError}</Text>
      ) : null}
      <Button
        title={submitButtonText}
        onPress={() => {
          let submitInfo = { email, password };
          if (signup) submitInfo = { ...submitInfo, confirmPassword, handle };
          return onSubmit(submitInfo);
        }}
      />
    </View>
  );
};

export default LoginForm;
