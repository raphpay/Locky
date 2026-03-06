import { ArrowUpDown, Check } from "lucide-react";
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

interface ItemProps {
  isSelected: boolean;
  title: string;
  onClick: () => void;
}

function Item({ isSelected, title, onClick }: ItemProps) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="flex justify-between items-center cursor-pointer"
    >
      {title}
      {isSelected && <Check className="ml-2 h-4 w-4" />}
    </DropdownMenuItem>
  );
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
        <Button variant="secondary">
          <ArrowUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <Item
            onClick={() => {
              onSortSelectionChange(SORTING_SELECTION.TITLE);
            }}
            isSelected={sortingSelection === SORTING_SELECTION.TITLE}
            title={"Titre"}
          />
          <Item
            onClick={() => {
              onSortSelectionChange(SORTING_SELECTION.WEBSITE);
            }}
            isSelected={sortingSelection === SORTING_SELECTION.WEBSITE}
            title={"Site Web"}
          />
          <Item
            onClick={() => {
              onSortSelectionChange(SORTING_SELECTION.CREATED_AT);
            }}
            isSelected={sortingSelection === SORTING_SELECTION.CREATED_AT}
            title={"Date de création"}
          />
          <Item
            onClick={() => {
              onSortSelectionChange(SORTING_SELECTION.UPDATED_AT);
            }}
            isSelected={sortingSelection === SORTING_SELECTION.UPDATED_AT}
            title={"Date de modification"}
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Item
          onClick={() => {
            onSortIsAscendingChange(true);
          }}
          isSelected={isSortingAscending}
          title={"Ascendant"}
        />
        <Item
          onClick={() => {
            onSortIsAscendingChange(false);
          }}
          isSelected={!isSortingAscending}
          title={"Descendant"}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortingDropdown;
