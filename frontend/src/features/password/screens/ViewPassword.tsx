import useViewPasswordScreen from "../hooks/useViewPasswordScreen";

function ViewPassword() {
  const { data, isLoading, error, handleNavigateBack } =
    useViewPasswordScreen();

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
      <button className="absolute top-2 right-2" onClick={handleNavigateBack}>
        Retour
      </button>

      {data ? (
        <div className="flex flex-col gap-2">
          <p>Website: {data.website}</p>
          <p>Username: {data.username}</p>
          <p>Password: {data.password}</p>
          <p>Notes: {data.notes}</p>
        </div>
      ) : (
        <p>Données invalides</p>
      )}
    </div>
  );
}

export default ViewPassword;
