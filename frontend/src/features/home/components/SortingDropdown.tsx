import { Check } from "lucide-react";
import { Button } from "../../../ui/components/radix/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/components/radix/DropdownMenu";
import SORTING_SELECTION from "../sort/sortingSelection";

interface Props {
  sortingSelection: SORTING_SELECTION;
  onSortSelectionChange: (selection: SORTING_SELECTION) => void;
  isSortingAscending: boolean;
  onSortIsAscendingChange: (newValue: boolean) => void;
}

function SortingDropdown({
  sortingSelection,
  onSortSelectionChange,
  isSortingAscending,
  onSortIsAscendingChange,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Ranger par</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              onSortSelectionChange(SORTING_SELECTION.TITLE);
            }}
            className="flex items-center"
          >
            {sortingSelection === SORTING_SELECTION.TITLE && (
              <Check className="ml-2 h-4 w-4" />
            )}
            Titre
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onSortSelectionChange(SORTING_SELECTION.WEBSITE);
            }}
          >
            {sortingSelection === SORTING_SELECTION.WEBSITE && (
              <Check className="ml-2 h-4 w-4" />
            )}
            Site Web
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onSortSelectionChange(SORTING_SELECTION.CREATED_AT);
            }}
          >
            {sortingSelection === SORTING_SELECTION.CREATED_AT && (
              <Check className="ml-2 h-4 w-4" />
            )}
            Date de création
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onSortSelectionChange(SORTING_SELECTION.UPDATED_AT);
            }}
          >
            {sortingSelection === SORTING_SELECTION.UPDATED_AT && (
              <Check className="ml-2 h-4 w-4" />
            )}
            Date de modification
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            onSortIsAscendingChange(true);
          }}
        >
          {isSortingAscending && <Check className="ml-2 h-4 w-4" />}
          Ascendant
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onSortIsAscendingChange(false);
          }}
        >
          {!isSortingAscending && <Check className="ml-2 h-4 w-4" />}
          Descendant
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortingDropdown;
