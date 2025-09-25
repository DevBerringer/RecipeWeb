import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
  currentPage: number;
  hasMore: boolean;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export default function PaginationControls({
  currentPage,
  hasMore,
  loading,
  onPrev,
  onNext,
}: Props) {
  if (loading) return null;
  return (
    <div className="my-8 flex justify-center gap-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentPage === 0}
        className={`flex items-center gap-2 rounded-lg px-5 py-3 text-lg font-medium shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          currentPage === 0
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : 'bg-recipecentral text-white hover:bg-recipecentral-dark focus:ring-blue-500'
        }`}
      >
        <ArrowLeft size={20} />
        Previous
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!hasMore}
        className={`flex items-center gap-2 rounded-lg px-5 py-3 text-lg font-medium shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          !hasMore
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : 'bg-recipecentral text-white hover:bg-recipecentral-dark focus:ring-blue-500'
        }`}
      >
        Next
        <ArrowRight size={20} />
      </button>
    </div>
  );
}


