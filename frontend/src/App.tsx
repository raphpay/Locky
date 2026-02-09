import { useNavigate } from "react-router";
import "./App.css";
import Routes from "./features/navigation/Routes";

function App() {
  const navigate = useNavigate();

  function handleLogIn() {
    navigate(Routes.LOGIN);
  }

  function handleSignUp() {
    navigate(Routes.SIGNUP);
  }

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleLogIn}>Log In</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default App;
