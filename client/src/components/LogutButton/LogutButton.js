import React, {useContext} from 'react';
import { useApolloClient} from "@apollo/react-hooks";
import UserContext from "../../UserContext/UserContext";
import Button from "../Button/Button";

const LogoutButton = () => {
  const apolloClient = useApolloClient();
  const { doUpdateToken } = useContext(UserContext);

  return (
    <Button onClick={() => {
      localStorage.removeItem('token');
      doUpdateToken();
      apolloClient.resetStore();
    }}>logout</Button>
  )
};

export default LogoutButton;
