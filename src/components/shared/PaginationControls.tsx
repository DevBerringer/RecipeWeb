interface PaginationControlsProps {
  currentPage: number;
  hasMore: boolean;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export default function PaginationControls({
  currentPage,
  hasMore,
  loading,
  onPrev,
  onNext,
  className = "",
}: PaginationControlsProps) {
  if (loading) return null;

  return (
    <div className={`my-8 flex justify-center gap-6 ${className}`}>
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className={`handWritten rounded-xl border-2 border-dashed px-6 py-3 text-lg font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-700/30 ${
          currentPage === 0
            ? 'cursor-not-allowed border-stone-300 bg-stone-100 text-stone-400'
            : 'border-amber-900/30 bg-amber-50/60 text-stone-700 hover:bg-amber-100/60'
        }`}
      >
        ← Previous Page
      </button>
      <button
        onClick={onNext}
        disabled={!hasMore}
        className={`handWritten rounded-xl border-2 border-dashed px-6 py-3 text-lg font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-700/30 ${
          !hasMore
            ? 'cursor-not-allowed border-stone-300 bg-stone-100 text-stone-400'
            : 'border-amber-900/30 bg-amber-50/60 text-stone-700 hover:bg-amber-100/60'
        }`}
      >
        Next Page →
      </button>
    </div>
  );
}
