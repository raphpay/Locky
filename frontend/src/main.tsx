import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import Navigation from "./features/navigation/Navigation.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Navigation />
  </BrowserRouter>,
);
