import { Fingerprint } from "lucide-react";

interface FingerprintScannerProps {
  onScan: () => void;
  isScanning?: boolean;
}

const FingerprintScanner = ({
  onScan,
  isScanning = false,
}: FingerprintScannerProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={onScan}
        disabled={isScanning}
        className={`
          relative flex items-center justify-center size-24 rounded-2xl
          bg-white border-2 transition-all duration-300 group
          ${
            isScanning
              ? "border-blue-400 cursor-wait"
              : "border-gray-200 hover:border-blue-500 hover:shadow-lg active:scale-95"
          }
        `}
      >
        {/* L'icône principale */}
        <Fingerprint
          size={48}
          className={`
            transition-colors duration-300
            ${isScanning ? "text-blue-500" : "text-gray-400 group-hover:text-blue-500"}
          `}
        />

        {/* Animation de scan (Ligne qui descend) */}
        {isScanning && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan-line" />
          </div>
        )}

        {/* Halo pulsant quand c'est prêt */}
        {!isScanning && (
          <div className="absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 group-hover:animate-ping pointer-events-none" />
        )}
      </button>

      <p className="text-sm font-medium text-gray-500">
        {isScanning ? "Authentification en cours..." : "Cliquez pour scanner"}
      </p>
    </div>
  );
};

export default FingerprintScanner;
