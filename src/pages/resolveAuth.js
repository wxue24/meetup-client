import React, { useEffect, useState } from "react";
import { tryLocalLogin } from "../redux/actions/userActions";
import { useSelector, connect } from "react-redux";
import Loading from "../components/Loading";

const resolveAuth = (props) => {
  const auth = useSelector((state) => state.user.authenticated);
  const [authChanged, setAuthChanged] = useState(0);

  useEffect(() => {
    props.tryLocalLogin();
  }, []);

  useEffect(() => {
    if (authChanged == 0) {
      setAuthChanged(authChanged + 1);
    } else {
      if (!auth) props.navigation.navigate("Location");
    }
  }, [auth]);

  return <Loading animating={true} />;
};

const mapDispatchToProps = {
  tryLocalLogin,
};

export default connect(null, mapDispatchToProps)(resolveAuth);
