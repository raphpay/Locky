import { ArrowUpDown, Plus, User } from "lucide-react";
import { Button } from "../../../ui/components/radix/Button";
import { SearchInput } from "../../../ui/components/custom/SearchInput";

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

function TopBar({ searchQuery, setSearchQuery }: Props) {
  return (
    <div className="flex w-full justify-between absolute top-8 left-8">
      <div className="flex gap-2">
        <Button variant={"secondary"}>
          <User />
        </Button>
        <Button variant={"secondary"}>
          <ArrowUpDown />
        </Button>
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
