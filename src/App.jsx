import { Amplify } from "aws-amplify";
import awsConfig from "./aws-exports";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "./components/Auth";
import { Home } from "./components/Home";

Amplify.configure(awsConfig);

export default function App() {
  return (
    <Authenticator.Provider>
      <AppLoad />
    </Authenticator.Provider>
  );
}

function AppLoad() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus === "configuring") return <p>Loading ...</p>;
  else if (authStatus === "unauthenticated") return <Auth />;
  return <Home />;
}
