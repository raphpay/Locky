import { Button } from "../../../ui/components/radix/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/components/radix/DropdownMenu";
import { Toaster } from "../../../ui/components/radix/Sonner";
import { Spinner } from "../../../ui/components/radix/Spinner";
import PasswordCard from "../../password/components/PasswordCard";
import useHomeScreen from "../hooks/useHomeScreen";
import SORTING_SELECTION from "../sort/sortingSelection";

function Home() {
  const {
    sortedPasswords,
    isLoading,
    error,
    fileRef,
    isSendingPasswords,
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
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Error while loading passwords
      </div>
    );

  // TODO: Move it to its separate component
  function Dropdown() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Ranger par</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                handleSortSelection(SORTING_SELECTION.TITLE);
              }}
            >
              Titre
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSortSelection(SORTING_SELECTION.WEBSITE);
              }}
            >
              Site Web
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSortSelection(SORTING_SELECTION.CREATED_AT);
              }}
            >
              Date de création
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSortSelection(SORTING_SELECTION.UPDATED_AT);
              }}
            >
              Date de modification
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              handleSortIsAscendingChange(true);
            }}
          >
            Ascendant
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleSortIsAscendingChange(false);
            }}
          >
            Descendant
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex gap-2 absolute top-4 right-4">
        {Dropdown()}

        <button className="rounded-md" onClick={createPassword}>
          + Create a password
        </button>

        <button onClick={handleImport}>Importer des mots de passe</button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex flex-col gap-2">
          {sortedPasswords.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No passwords found
            </p>
          ) : (
            sortedPasswords?.map((password, index) => (
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

      <Toaster />

      {isSendingPasswords && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          {/* Box blanche ou transparente pour le spinner */}
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-3">
            <Spinner className="size-10" />
            <p className="text-sm font-medium text-gray-700">
              Traitement en cours...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
