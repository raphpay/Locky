"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./InputGroup";
import { Eye, EyeClosed } from "lucide-react";

export function SecureInput({ ...props }: React.ComponentProps<"input">) {
  const [isShown, setIsShown] = useState<boolean>(false);

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput {...props} type={isShown ? "text" : "password"} />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="password"
            title="Password"
            size="icon-xs"
            onClick={() => setIsShown(!isShown)}
          >
            {isShown ? <Eye /> : <EyeClosed />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
