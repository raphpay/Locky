import { useEffect } from "react";
import { Delete } from "lucide-react";

interface PinPadProps {
  pin: string;
  length?: number;
  setPin: (pin: string) => void;
  onComplete: (pin: string) => void;
}

const PinPad = ({ pin, length = 6, setPin, onComplete }: PinPadProps) => {
  // We separate the 0 from the others for the keyboard layout
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const handlePress = (val: string) => {
    // Usage of the 'length' prop instead of '6'
    if (pin.length < length) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === length) {
        onComplete(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) handlePress(e.key);
      if (e.key === "Backspace") handleDelete();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // On ajoute toutes les dépendances nécessaires pour éviter les fermetures (closures) obsolètes
  }, [pin, length]);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Points Visualisation */}
      <div className="flex gap-4">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className={`size-4 rounded-full border-2 transition-all duration-200 ${
              i < pin.length
                ? "bg-blue-600 border-blue-600 scale-125 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Numbers grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* 1 à 9 */}
        {numbers.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handlePress(num)}
            className="size-16 rounded-full bg-gray-100 hover:bg-gray-200 text-2xl font-semibold transition-all active:scale-90"
          >
            {num}
          </button>
        ))}
        {/* Last line : Empty | 0 | Delete */}
        <div /> {/* Empty space on the left */}
        <button
          type="button"
          onClick={() => handlePress("0")}
          className="size-16 rounded-full bg-gray-100 hover:bg-gray-200 text-2xl font-semibold transition-all active:scale-90"
        >
          0
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="size-16 rounded-full flex items-center justify-center hover:bg-red-50 text-red-500 transition-all active:scale-90"
        >
          <Delete size={24} />
        </button>
      </div>
    </div>
  );
};

export default PinPad;
