import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../navigation/Routes";

export default function useLoginWithPhrase() {
  const navigate = useNavigate();

  const [recoveryPhrase, setRecoveryPhrase] = useState<string>("");

  async function setUpPassword() {
    navigate(ROUTES.LOGIN, { state: { recoveryPhrase } });
  }

  return {
    recoveryPhrase,
    setRecoveryPhrase,
    setUpPassword,
  };
}
