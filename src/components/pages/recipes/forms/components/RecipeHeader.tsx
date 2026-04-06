import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';
import { useValidation } from '../contexts/ValidationContext';

export default function RecipeHeader() {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const { getFieldError, hasFieldError, validateField, clearFieldError } = useValidation();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipeDraft({ ...recipeDraft, name: value });
    
    if (value.trim().length > 0) {
      clearFieldError('name');
    }
  };

  const handleNameBlur = () => {
    validateField('name', recipeDraft.name);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        id="name"
        placeholder="Enter Recipe Name"
        value={recipeDraft.name}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        className={`handWritten max-w-full rounded-2xl border-2 border-dashed px-4 py-3 text-center text-2xl md:text-4xl shadow-sm focus:outline-none focus:ring-2 ${
          hasFieldError('name')
            ? 'border-red-500 bg-red-50/60 focus:ring-red-500/30'
            : 'border-amber-900/30 bg-amber-50/60 focus:ring-amber-700/30'
        }`}
      />
      {getFieldError('name') && (
        <p className="mt-2 text-sm text-red-600 text-center">{getFieldError('name')}</p>
      )}
    </div>
  );
}
