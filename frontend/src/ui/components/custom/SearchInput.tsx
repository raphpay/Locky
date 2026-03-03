"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../radix/InputGroup";
import { Search } from "lucide-react";

export function SearchInput({ ...props }: React.ComponentProps<"input">) {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput {...props} placeholder="Rechercher ( Cmd + K )" />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
