import type FIRPasswordDecrypted from "../../password/model/FIRPasswordDecrypted";

interface Props {
  password: FIRPasswordDecrypted;
  navigateToViewPassword: (id: string) => void;
}

function PasswordCard({ password, navigateToViewPassword }: Props) {
  return (
    <span
      key={password.id}
      className="flex items-center gap-4 w-full p-3 bg-white hover:bg-gray-400 cursor-pointer rounded-lg shadow-sm"
      onClick={() => navigateToViewPassword(password.id)}
    >
      <div className="rounded-full bg-gray-200 text-gray-700 font-bold w-12 h-12 shrink-0 flex items-center justify-center">
        {password.title[0].toUpperCase()}
      </div>

      <div className="flex flex-col flex-1 items-start">
        <p className="font-semibold text-lg text-gray-900 leading-tight">
          {password.title}
        </p>
        <p className="text-sm text-gray-500">{password.username}</p>
      </div>
    </span>
  );
}

export default PasswordCard;
