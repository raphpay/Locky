import { useNavigate } from "react-router";
import ROUTES from "../../navigation/Routes";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../../cache/QUERY_KEYS";
import { fetchPasswords } from "../../password/fetchPasswords";

function Home() {
  const navigate = useNavigate();

  const {
    data: passwords,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.PASSWORDS],
    queryFn: () => fetchPasswords(),
  });

  function createPassword() {
    navigate(ROUTES.CREATE_PASSWORD);
  }

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Error while loading passwords
      </div>
    );

  return (
    <div className="flex flex-1 flex-col gap-2">
      <p>Home</p>

      <button className="absolute top-2 right-2" onClick={createPassword}>
        + Create a password
      </button>

      <div className="flex flex-col gap-2">
        {passwords?.length === 0 ? (
          <p>No passwords found</p>
        ) : (
          passwords?.map((password, index) => (
            <div key={password.id ?? index} className="flex items-center gap-2">
              <p>{password.username}</p>
              <button
                className="text-blue-500"
                onClick={() =>
                  navigate(ROUTES.VIEW_PASSWORD, { state: password })
                }
              >
                View
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
