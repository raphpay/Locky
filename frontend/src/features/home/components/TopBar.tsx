import { Import, Plus, UserCog } from "lucide-react";
import { useNavigate } from "react-router";
import { SearchInput } from "../../../ui/components/custom/SearchInput";
import { Button } from "../../../ui/components/radix/Button";
import { ROUTES } from "../../navigation/Routes";
import { SORTING_SELECTION } from "../sort/sortingSelection";
import SortingDropdown from "./SortingDropdown";

interface Props {
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortingSelection: SORTING_SELECTION;
  onSortSelectionChange: (selection: SORTING_SELECTION) => void;
  isSortingAscending: boolean;
  onSortIsAscendingChange: (newValue: boolean) => void;
  setDisplayCreatePasswordModal: (value: boolean) => void;
  handleImport: () => void;
}

function TopBar({
  searchInputRef,
  searchQuery,
  setSearchQuery,
  sortingSelection,
  onSortSelectionChange,
  isSortingAscending,
  onSortIsAscendingChange,
  setDisplayCreatePasswordModal,
  handleImport,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between absolute top-8 left-8">
      <div className="flex gap-2">
        <Button onClick={() => navigate(ROUTES.SETTINGS)} variant={"secondary"}>
          <UserCog />
        </Button>
        <SortingDropdown
          sortingSelection={sortingSelection}
          onSortSelectionChange={onSortSelectionChange}
          isSortingAscending={isSortingAscending}
          onSortIsAscendingChange={onSortIsAscendingChange}
        />
        <Button
          onClick={() => setDisplayCreatePasswordModal(true)}
          variant={"secondary"}
        >
          <Plus />
        </Button>
        <Button onClick={handleImport} variant={"secondary"}>
          <Import />
        </Button>
      </div>
      <div className="pr-16">
        <SearchInput
          ref={searchInputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TopBar;
