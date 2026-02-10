import { useNavigate } from "react-router";
import "./App.css";
import ROUTES from "./features/navigation/Routes";

function App() {
  const navigate = useNavigate();

  function handleLogIn() {
    navigate(ROUTES.LOGIN);
  }

  function handleSignUp() {
    navigate(ROUTES.SIGNUP);
  }

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleLogIn}>Log In</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default App;
