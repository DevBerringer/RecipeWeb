import { ChangeEvent } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 p-3 shadow-sm">
      <label className="mb-2 block text-sm font-semibold text-amber-900">Search</label>
      <input
        type="text"
        placeholder="Search recipes..."
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-amber-900/20 bg-white px-3 py-2 text-base shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-700/30"
      />
    </div>
  );
}


