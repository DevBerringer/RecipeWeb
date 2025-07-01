import clsx from 'clsx';

type RecipeTagProps = {
  label: string;
  idx: number;
  baseColor: string;
  borderColor: string;
  shadowColor: string;
};

function RecipeTag({ label, idx, baseColor, borderColor, shadowColor }: RecipeTagProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-md px-4 py-1.5 text-center font-["Caveat"] text-base',
        idx % 3 === 0 ? 'rotate-2' : idx % 3 === 1 ? '-rotate-1' : 'rotate-3',
        baseColor
      )}
      style={{
        border: `1px dashed ${borderColor}`,
        boxShadow: `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px ${shadowColor}`,
      }}
    >
      {label}
    </span>
  );
}

export default RecipeTag;
