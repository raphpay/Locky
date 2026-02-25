import { CircleChevronRight } from "lucide-react";
import type FIRPasswordDecrypted from "../../password/model/FIRPasswordDecrypted";

interface Props {
  password: FIRPasswordDecrypted;
  navigateToViewPassword: (id: string) => void;
}

function PasswordCard({ password, navigateToViewPassword }: Props) {
  return (
    <span
      className="flex items-center justify-between w-full p-3 bg-white hover:bg-primary-light/70 cursor-pointer rounded-lg shadow-sm"
      onClick={() => navigateToViewPassword(password.id)}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary-light text-primary-text font-bold w-12 h-12 shrink-0 flex items-center justify-center">
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

      <CircleChevronRight color="#3366FF" />
    </span>
  );
}

export default PasswordCard;
