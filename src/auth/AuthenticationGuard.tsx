import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loader from "../components/shared/Loader";

export const AuthenticationGuard = ({ component }: any) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <Loader />
      </div>
    ),
  });

  return <Component />;
};
