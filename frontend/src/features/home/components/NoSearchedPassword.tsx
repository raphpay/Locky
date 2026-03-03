import { Button } from "../../../ui/components/radix/Button";

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function NoSearchedPassword({ searchQuery, setSearchQuery }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-secondary-text text-5xl max-w-150 text-center">
        Aucun résultat pour {searchQuery}
      </h1>
      <Button onClick={() => setSearchQuery("")}>Effacer la recherche</Button>
    </div>
  );
}

export default NoSearchedPassword;
