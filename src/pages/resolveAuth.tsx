import React, { useEffect, useState } from "react";
import { tryLocalLogin } from "../redux/actions/userActions";
import { connect } from "react-redux";
import Loading from "../components/Loading";
import { useAppSelector } from "../redux/hooks";


interface Props {
  tryLocalLogin: () => void;
  navigation: any;
}
const resolveAuth = ({tryLocalLogin, navigation}: Props) => {
  const auth = useAppSelector((state) => state.user.authenticated);
  const [authChanged, setAuthChanged] = useState(0);

  useEffect(() => {
    tryLocalLogin();
  }, []);

  useEffect(() => {
    if (authChanged === 0) {
      setAuthChanged(authChanged + 1);
    } else {
      if (!auth) navigation.navigate("Login");
    }
  }, [auth]);

  return <Loading animating={true} />;
};

const mapDispatchToProps = {
  tryLocalLogin,
};

export default connect(null, mapDispatchToProps)(resolveAuth);
