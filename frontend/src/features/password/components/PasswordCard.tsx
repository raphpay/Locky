import { CircleChevronRight } from "lucide-react";
import type FIRPasswordDecrypted from "../../password/model/FIRPasswordDecrypted";

interface Props {
  password: FIRPasswordDecrypted;
  selectPassword: (password: FIRPasswordDecrypted | null) => void;
}

function PasswordCard({ password, selectPassword }: Props) {
  return (
    <span
      className="flex items-center justify-between w-full p-3
                bg-white dark:bg-tertiary-dark hover:bg-tertiary-dark/10 dark:hover:bg-tertiary/70
                cursor-pointer rounded-lg shadow-sm"
      onClick={() => selectPassword(password)}
    >
      <div className="flex items-center gap-4">
        <div
          className="rounded-full font-bold w-12 h-12 shrink-0 flex items-center justify-center
          bg-primary-light text-primary-text dark:text-tertiary-dark
          "
        >
          {password.title[0].toUpperCase()}
        </div>

        <div className="flex flex-col flex-1 items-start">
          <p className="font-semibold text-lg text-primary-text leading-tight">
            {password.title}
          </p>

          <p className="text-sm text-secondary-text">{password.username}</p>
          <p className="text-sm text-secondary-text">{password.website}</p>
        </div>
      </div>

      <CircleChevronRight />
    </span>
  );
}

export default PasswordCard;
