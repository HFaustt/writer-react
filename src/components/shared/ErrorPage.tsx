import { useNavigate } from "react-router-dom";
import { GoBackBtn } from "../ui/Buttons/Buttons";

function ErrorPage() {
  const navigate = useNavigate();

  function onGoingBack() {
    navigate(-1);
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>Page Not Found...</p>
      <GoBackBtn onClick={onGoingBack} />
    </div>
  );
}

export default ErrorPage;
