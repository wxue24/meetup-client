import React, { useEffect, useState } from "react";
import { tryLocalLogin } from "../redux/actions/userActions";
import Loading from "../components/Loading";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: any;
}
const resolveAuth = ({ navigation }: Props) => {
  const auth = useAppSelector((state) => state.user.authenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tryLocalLogin());
  }, []);

  useEffect(() => {
    if (auth == false) {
      console.log("auth:", auth);
      navigation.navigate("Login");
    }
  }, [auth]);

  return <Loading animating={true} />;
};

export default resolveAuth;
