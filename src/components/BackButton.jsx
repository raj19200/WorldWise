import Button from "./Button";
import { useNavigate } from "react-router-dom";
function BackButton() {
  const navigate = useNavigate();
  const navgateBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <Button type="back" onClick={navgateBack}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
