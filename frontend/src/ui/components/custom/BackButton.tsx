import { ArrowLeft } from "lucide-react";
import { Button } from "../radix/Button";
import { useNavigate } from "react-router";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant={"outline"}
      className="absolute top-8 left-8"
      onClick={onClick ? () => onClick() : () => navigate(-1)}
    >
      <ArrowLeft />
      Retour
    </Button>
  );
};

export default BackButton;
