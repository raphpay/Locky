import { Construction } from "lucide-react";
import BackButton from "../../../ui/components/custom/BackButton";

function SettingsScreen() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-4">
      <BackButton />
      <h1 className="text-center text-primary-text font-font-semibold text-3xl">
        Screen under construction
      </h1>
      <Construction className="text-accent size-16" />
    </div>
  );
}

export default SettingsScreen;
