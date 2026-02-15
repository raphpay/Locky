import { useEffect } from "react";
import { Delete } from "lucide-react";

interface PinPadProps {
  pin: string;
  setPin: (pin: string) => void;
  onComplete: (pin: string) => void;
}

const PinPad = ({ pin, setPin, onComplete }: PinPadProps) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const handlePress = (val: string) => {
    if (pin.length < 6) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === 6) {
        onComplete(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) handlePress(e.key);
      if (e.key === "Backspace") handleDelete();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pin]);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Points Visualisation */}
      <div className="flex gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`size-4 rounded-full border-2 transition-all duration-200 ${
              i < pin.length
                ? "bg-blue-600 border-blue-600 scale-125"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Numbers grid */}
      <div className="grid grid-cols-3 gap-4">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => handlePress(num)}
            className="size-16 rounded-full bg-gray-100 hover:bg-gray-200 text-2xl font-semibold transition-colors active:scale-95"
          >
            {num}
          </button>
        ))}
        {/* Spacer to align the 0 in the middle */}
        <button
          onClick={handleDelete}
          className="size-16 rounded-full flex items-center justify-center hover:bg-red-50 text-red-500 transition-colors"
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default PinPad;
