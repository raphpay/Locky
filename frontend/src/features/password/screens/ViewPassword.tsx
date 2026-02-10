import useViewPasswordScreen from "../hooks/useViewPasswordScreen";

function ViewPassword() {
  const {
    data,
    isLoading,
    error,
    isHovered,
    setIsHovered,
    handleNavigateBack,
    handleCopyPassword,
  } = useViewPasswordScreen();

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Error while loading password
      </div>
    );

  return (
    <div className="flex flex-1 flex-col gap-2">
      <button className="absolute top-2 right-2" onClick={handleNavigateBack}>
        Retour
      </button>

      {data ? (
        <div className="flex flex-col gap-2">
          <div>
            <span className="text-sm text-gray-500 block">Site web</span>
            <p className="font-medium">{data.website}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500 block">Identifiant</span>
            <p className="font-medium">{data.username}</p>
          </div>

          <div>
            <span className="text-sm text-gray-500 block">Password</span>
            <div
              className="p-2 rounded cursor-copy transition-all duration-200"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleCopyPassword}
            >
              {/* Logique d'affichage conditionnel */}
              <p className="font-mono text-lg tracking-wider">
                {isHovered ? data.password : "••••••••••••"}
              </p>
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-500 block">Notes</span>
            <p className="font-medium">{data.notes}</p>
          </div>
        </div>
      ) : (
        <p>Données invalides</p>
      )}
    </div>
  );
}

export default ViewPassword;
