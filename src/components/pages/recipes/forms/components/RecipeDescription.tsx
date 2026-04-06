import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';
import { useValidation } from '../contexts/ValidationContext';

export default function RecipeDescription() {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const { getFieldError, hasFieldError, validateField, clearFieldError } = useValidation();

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRecipeDraft({ ...recipeDraft, description: value });
    
    if (value.trim().length > 0) {
      clearFieldError('description');
    }
  };

  const handleDescriptionBlur = () => {
    validateField('description', recipeDraft.description);
  };

  return (
    <section>
      <div className="mb-4">
        <label className="handWritten block text-xl font-semibold text-gray-800 mb-2">
          📝 Description
        </label>
        <textarea
          value={recipeDraft.description}
          onChange={handleDescriptionChange}
          onBlur={handleDescriptionBlur}
          className={`handWritten w-full rounded-2xl border-2 border-dashed px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 ${
            hasFieldError('description')
              ? 'border-red-500 bg-red-50/60 focus:ring-red-500/30'
              : 'border-amber-900/30 bg-amber-50/60 focus:ring-amber-700/30'
          }`}
          rows={3}
          placeholder="Describe your recipe..."
        />
        {getFieldError('description') && (
          <p className="mt-2 text-sm text-red-600">{getFieldError('description')}</p>
        )}
      </div>
    </section>
  );
}
