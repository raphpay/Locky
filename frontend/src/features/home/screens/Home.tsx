import { Toaster } from "../../../ui/components/radix/Sonner";
import { Spinner } from "../../../ui/components/radix/Spinner";
import PasswordCard from "../../password/components/PasswordCard";
import useHomeScreen from "../hooks/useHomeScreen";
import TopBar from "../components/TopBar";
import NoPassword from "../components/NoPassword";
import CreatePasswordModal from "../../password/components/CreatePasswordModal";
import NoSearchedPassword from "../components/NoSearchedPassword";

function Home() {
  const {
    passwords,
    filteredAndSortedPasswords,
    isLoading,
    error,
    fileRef,
    sortingSelection,
    isSortingAscending,
    searchQuery,
    setSearchQuery,
    displayCreatePasswordModal,
    setDisplayCreatePasswordModal,
    navigateToViewPassword,
    handleImport,
    handleFileChange,
    handleSortSelection,
    handleSortIsAscendingChange,
    searchInputRef,
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
    <div className="flex flex-col h-full w-full items-center justify-center p-4">
      {/* Absolute Top Bar */}
      <TopBar
        searchInputRef={searchInputRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortingSelection={sortingSelection}
        onSortSelectionChange={handleSortSelection}
        isSortingAscending={isSortingAscending}
        onSortIsAscendingChange={handleSortIsAscendingChange}
        setDisplayCreatePasswordModal={setDisplayCreatePasswordModal}
        handleImport={handleImport}
      />

      {/*No Password*/}
      <div className="flex flex-col gap-6 overflow-y-auto pt-15 w-full">
        {passwords?.length === 0 ? (
          <NoPassword handleImport={handleImport} />
        ) : (
          <>
            {filteredAndSortedPasswords.length === 0 ? (
              <NoSearchedPassword
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            ) : (
              filteredAndSortedPasswords.map((password, index) => (
                <PasswordCard
                  key={password.id ?? index}
                  password={password}
                  navigateToViewPassword={navigateToViewPassword}
                />
              ))
            )}
          </>
        )}
      </div>

      <CreatePasswordModal
        display={displayCreatePasswordModal}
        setDisplay={setDisplayCreatePasswordModal}
      />

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
