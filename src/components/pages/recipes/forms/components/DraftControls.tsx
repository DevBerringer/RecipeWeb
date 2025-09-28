import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';
import { useNavigate } from 'react-router-dom';

export default function DraftControls() {
  const { 
    recipeDraft, 
    clearDraft, 
    saveNamedDraft, 
    listDrafts, 
    loadDraft, 
    deleteDraft 
  } = useRecipeDraft();
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex flex-col md:flex-row max-w-7xl items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => {
            if (confirm('Start a new recipe? This will clear all fields.')) {
              clearDraft();
              navigate('/newRecipe');
            }
          }}
          className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-3 py-2 text-xs md:text-sm shadow-inner transition hover:bg-amber-50"
        >
          ✨ New
        </button>
        <button
          type="button"
          onClick={() => {
            const title = prompt('Save draft name?') || recipeDraft.name || 'Untitled Recipe';
            saveNamedDraft(title);
          }}
          className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-3 py-2 text-xs md:text-sm shadow-inner transition hover:bg-amber-50"
        >
          💾 Save
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2">
        <span className="handWritten text-sm text-stone-700">Open Draft:</span>
        <select
          className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-2 py-2 text-xs md:text-sm shadow-inner w-full md:w-auto"
          onChange={(e) => {
            const id = e.target.value;
            if (id) loadDraft(id);
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select draft
          </option>
          {listDrafts().map((d) => (
            <option key={d.id} value={d.id}>
              {d.title} — {new Date(d.updatedAt).toLocaleString()}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-2 py-2 text-xs md:text-sm shadow-inner transition hover:bg-amber-50"
          onClick={() => {
            const drafts = listDrafts();
            const id = prompt('Enter draft ID to delete:\n' + drafts.map((d) => `${d.id}: ${d.title}`).join('\n'));
            if (id) deleteDraft(id);
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
