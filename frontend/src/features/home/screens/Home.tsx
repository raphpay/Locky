import { Toaster } from "../../../ui/components/radix/Sonner";
import { Spinner } from "../../../ui/components/radix/Spinner";
import PasswordCard from "../../password/components/PasswordCard";
import useHomeScreen from "../hooks/useHomeScreen";
import TopBar from "../components/TopBar";
import NoPassword from "../components/NoPassword";

function Home() {
  const {
    sortedPasswords,
    isLoading,
    error,
    fileRef,
    isSendingPasswords,
    sortingSelection,
    isSortingAscending,
    searchQuery,
    setSearchQuery,
    createPassword,
    navigateToViewPassword,
    handleImport,
    handleFileChange,
    handleSortSelection,
    handleSortIsAscendingChange,
  } = useHomeScreen();

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Chargement...
      </div>
    );

  if (error)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Erreur lors du chargement des mots de passe
      </div>
    );

  return (
    <div className="flex flex-col h-full w-full justify-center p-4">
      {/* Absolute Top Bar */}
      <TopBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortingSelection={sortingSelection}
        onSortSelectionChange={handleSortSelection}
        isSortingAscending={isSortingAscending}
        onSortIsAscendingChange={handleSortIsAscendingChange}
      />

      {/*No Password*/}
      <div className="flex flex-col gap-2 overflow-y-auto pt-15">
        {sortedPasswords.length === 0 ? (
          <NoPassword handleImport={handleImport} />
        ) : (
          sortedPasswords.map((password, index) => (
            <PasswordCard
              key={password.id ?? index}
              password={password}
              navigateToViewPassword={navigateToViewPassword}
            />
          ))
        )}
      </div>

      {/* Hidden Input */}
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
