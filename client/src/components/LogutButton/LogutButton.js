import React, {useContext} from 'react';
import { useApolloClient} from "@apollo/react-hooks";
import UserContext from "../../UserContext/UserContext";
import Button from "../Button/Button";

const LogoutButton = () => {
  const apolloClient = useApolloClient();
  const { doUpdateToken } = useContext(UserContext);

  return (
    <Button onClick={async () => {
      try {
        localStorage.removeItem('token');
        doUpdateToken();
        await apolloClient.resetStore();
      } catch (error) {
       console.error(error);
      }
    }}>logout</Button>
  )
};

export default LogoutButton;
