import React, { useContext } from "react";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/common/Loader";

export default function RootNavigator() {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader label="Waking up your Hipsy account..." />;
  }

  return token ? <MainNavigator /> : <AuthNavigator />;
}
