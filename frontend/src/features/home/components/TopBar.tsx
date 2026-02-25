import { Plus, User } from "lucide-react";
import { Button } from "../../../ui/components/radix/Button";
import { SearchInput } from "../../../ui/components/custom/SearchInput";
import SortingDropdown from "./SortingDropdown";
import type SORTING_SELECTION from "../sort/sortingSelection";

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortingSelection: SORTING_SELECTION;
  onSortSelectionChange: (selection: SORTING_SELECTION) => void;
  isSortingAscending: boolean;
  onSortIsAscendingChange: (newValue: boolean) => void;
}

function TopBar({
  searchQuery,
  setSearchQuery,
  sortingSelection,
  onSortSelectionChange,
  isSortingAscending,
  onSortIsAscendingChange,
}: Props) {
  return (
    <div className="flex w-full justify-between absolute top-8 left-8">
      <div className="flex gap-2">
        <Button variant={"secondary"}>
          <User />
        </Button>
        <SortingDropdown
          sortingSelection={sortingSelection}
          onSortSelectionChange={onSortSelectionChange}
          isSortingAscending={isSortingAscending}
          onSortIsAscendingChange={onSortIsAscendingChange}
        />
        <Button variant={"secondary"}>
          <Plus />
        </Button>
      </div>
      <div className="pr-16">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TopBar;
