import { cn } from "../../lib/utils";

interface DetailFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  renderInput: () => React.ReactNode;
  onCopy: () => void;
  isPassword?: boolean;
  isHovered?: boolean;
  onHoverChange?: (hovered: boolean) => void;
}

function DetailField({
  label,
  value,
  isEditing,
  renderInput,
  onCopy,
  isPassword,
  isHovered,
  onHoverChange,
}: DetailFieldProps) {
  return (
    <div className="flex w-full justify-between items-center gap-6 py-4 border-b border-gray-50 last:border-none group">
      <p className="text-gray-500 text-sm font-medium shrink-0 w-32">{label}</p>

      <div className="min-w-0 flex-1 flex justify-end items-center">
        {isEditing ? (
          renderInput()
        ) : (
          <div
            className="cursor-copy hover:bg-gray-50 px-3 py-1.5 rounded-md transition-all truncate text-right max-w-full relative"
            onClick={onCopy}
            onMouseEnter={() => onHoverChange?.(true)}
            onMouseLeave={() => onHoverChange?.(false)}
          >
            <p
              className={cn(
                "text-secondary-text text-sm truncate",
                isPassword && "font-mono tracking-widest",
              )}
            >
              {isPassword && !isHovered ? "••••••••••••" : value || "—"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailField;
