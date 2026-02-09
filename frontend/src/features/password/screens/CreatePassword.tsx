import { useNavigate } from "react-router";
import ROUTES from "../../navigation/Routes";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
  website: string;
  note: string;
}

function CreatePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    website: "",
    note: "",
  });

  function handleNavigateBack() {
    navigate(ROUTES.HOME);
  }

  async function handleSubmit() {
    try {
      // TODO: Implement password creation logic
      console.log("Password created:", formData);
      // navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Error creating password:", error);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-2">
      <button onClick={handleNavigateBack} className="absolute top-2 left-2">
        Retour
      </button>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          className="border rounded-sm p-1"
          type="text"
          id="user-name"
          name="user-name"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          className="border rounded-sm p-1"
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          className="border rounded-sm p-1"
          type="text"
          id="website"
          name="website"
          placeholder="Site Web"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
        />
        <textarea
          className="border rounded-sm p-1"
          id="note"
          name="note"
          placeholder="Notes ( optionnel )"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />
        <button type="button" onClick={handleSubmit}>
          Create Password
        </button>
      </form>
    </div>
  );
}

export default CreatePassword;
