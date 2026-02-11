import PasswordCard from "../../password/components/PasswordCard";
import useHomeScreen from "../hooks/useHomeScreen";

function Home() {
  const {
    passwords,
    isLoading,
    error,
    fileRef,
    createPassword,
    navigateToViewPassword,
    handleImport,
    handleFileChange,
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
    <div className="flex flex-col h-full p-4">
      <div className="flex gap-2 absolute top-4 right-4">
        <button className="rounded-md" onClick={createPassword}>
          + Create a password
        </button>

        <button onClick={handleImport}>Importer des mots de passe</button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex flex-col gap-2">
          {passwords?.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No passwords found
            </p>
          ) : (
            passwords?.map((password, index) => (
              <PasswordCard
                password={password}
                key={password.id ?? index}
                navigateToViewPassword={navigateToViewPassword}
              />
            ))
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".csv"
      />
    </div>
  );
}

export default Home;
