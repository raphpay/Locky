import { Spinner } from "../../../ui/components/radix/Spinner";

interface Props {
  isLoading: boolean;
}

const LoadingSpinner = ({ isLoading }: Props) => {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/20 backdrop-blur-[1px]">
          {/* Box blanche ou transparente pour le spinner */}
          <div className="bg-background text-primary-text p-6 rounded-xl shadow-xl flex flex-col items-center gap-3">
            <Spinner className="size-10 text-primary" />
            <p className="text-sm font-medium text-secondary-text">
              Chargement en cours...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
