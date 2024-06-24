import { useAuth0 } from "@auth0/auth0-react";

const { user } = useAuth0();

function allowUserAccess() {
  if (user?.sub !== (import.meta.env.VITE_GITHUB_ID as String)) return;
}
