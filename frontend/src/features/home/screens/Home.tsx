import useHomeScreen from "../hooks/useHomeScreen";

function Home() {
  const {
    passwords,
    isLoading,
    error,
    createPassword,
    navigateToViewPassword,
  } = useHomeScreen();

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
                onClick={() => navigateToViewPassword(password.id)}
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
