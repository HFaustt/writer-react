import { useNavigate } from "react-router-dom";

function GoBackBtn() {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>← go back</button>;
}

export default GoBackBtn;
