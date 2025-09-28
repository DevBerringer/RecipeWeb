import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';
import { useValidation } from '../contexts/ValidationContext';

export default function RecipeStats() {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const { getFieldError, hasFieldError, validateField, clearFieldError, validateTimeFields } = useValidation();

  const handleTimeChange = (field: 'prepTimeMin' | 'cookTimeMin', value: number) => {
    const newDraft = { ...recipeDraft, [field]: value };
    setRecipeDraft(newDraft);
    
    // Validate both time fields together
    validateTimeFields(
      field === 'prepTimeMin' ? value : newDraft.prepTimeMin,
      field === 'cookTimeMin' ? value : newDraft.cookTimeMin
    );
  };

  const handleTimeBlur = () => {
    validateTimeFields(recipeDraft.prepTimeMin, recipeDraft.cookTimeMin);
  };

  const handleServesChange = (value: number) => {
    setRecipeDraft({ ...recipeDraft, serves: value });
    
    if (value > 0) {
      clearFieldError('serves');
    }
  };

  const handleServesBlur = () => {
    validateField('serves', recipeDraft.serves);
  };

  return (
    <section className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-3 md:grid-cols-5">
      <div className={`rounded-lg p-2 md:p-4 text-center shadow ${
        hasFieldError('prepTimeMin') ? 'bg-red-50' : 'bg-white'
      }`}>
        <div className="text-xs md:text-sm text-gray-500">Prep Time</div>
        <input
          type="number"
          value={recipeDraft.prepTimeMin || ''}
          onChange={(e) => handleTimeChange('prepTimeMin', parseInt(e.target.value) || 0)}
          onBlur={handleTimeBlur}
          className={`handWritten w-full text-center text-lg md:text-2xl font-semibold border-none bg-transparent focus:outline-none focus:ring-2 rounded ${
            hasFieldError('prepTimeMin') ? 'focus:ring-red-500' : 'focus:ring-amber-500'
          }`}
          placeholder="0"
        />
        <div className="text-xs md:text-sm text-gray-500">min</div>
        {getFieldError('prepTimeMin') && (
          <p className="text-xs text-red-600 mt-1">{getFieldError('prepTimeMin')}</p>
        )}
      </div>
      
      <div className={`rounded-lg p-2 md:p-4 text-center shadow ${
        hasFieldError('cookTimeMin') ? 'bg-red-50' : 'bg-white'
      }`}>
        <div className="text-xs md:text-sm text-gray-500">Cook Time</div>
        <input
          type="number"
          value={recipeDraft.cookTimeMin || ''}
          onChange={(e) => handleTimeChange('cookTimeMin', parseInt(e.target.value) || 0)}
          onBlur={handleTimeBlur}
          className={`handWritten w-full text-center text-lg md:text-2xl font-semibold border-none bg-transparent focus:outline-none focus:ring-2 rounded ${
            hasFieldError('cookTimeMin') ? 'focus:ring-red-500' : 'focus:ring-amber-500'
          }`}
          placeholder="0"
        />
        <div className="text-xs md:text-sm text-gray-500">min</div>
        {getFieldError('cookTimeMin') && (
          <p className="text-xs text-red-600 mt-1">{getFieldError('cookTimeMin')}</p>
        )}
      </div>
      
      <div className={`rounded-lg p-2 md:p-4 text-center shadow ${
        hasFieldError('serves') ? 'bg-red-50' : 'bg-white'
      }`}>
        <div className="text-xs md:text-sm text-gray-500">Serves</div>
        <input
          type="number"
          value={recipeDraft.serves || ''}
          onChange={(e) => handleServesChange(parseInt(e.target.value) || 0)}
          onBlur={handleServesBlur}
          className={`handWritten w-full text-center text-lg md:text-2xl font-semibold border-none bg-transparent focus:outline-none focus:ring-2 rounded ${
            hasFieldError('serves') ? 'focus:ring-red-500' : 'focus:ring-amber-500'
          }`}
          placeholder="0"
        />
        <div className="text-xs md:text-sm text-gray-500">people</div>
        {getFieldError('serves') && (
          <p className="text-xs text-red-600 mt-1">{getFieldError('serves')}</p>
        )}
      </div>
      
      <div className="rounded-lg bg-white p-2 md:p-4 text-center shadow">
        <div className="text-xs md:text-sm text-gray-500">Spicy</div>
        <select
          value={recipeDraft.isSpicy === null ? '' : recipeDraft.isSpicy.toString()}
          onChange={(e) =>
            setRecipeDraft({ 
              ...recipeDraft, 
              isSpicy: e.target.value === '' ? null : e.target.value === 'true' 
            })
          }
          className="handWritten w-full text-center text-lg md:text-2xl font-semibold border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
        >
          <option value="">N/A</option>
          <option value="false">❄️ Mild</option>
          <option value="true">🔥 Spicy</option>
        </select>
      </div>
      
      <div className="rounded-lg bg-white p-2 md:p-4 text-center shadow">
        <div className="text-xs md:text-sm text-gray-500">Vegetarian</div>
        <select
          value={recipeDraft.isVegetarian === null ? '' : recipeDraft.isVegetarian.toString()}
          onChange={(e) =>
            setRecipeDraft({ 
              ...recipeDraft, 
              isVegetarian: e.target.value === '' ? null : e.target.value === 'true' 
            })
          }
          className="handWritten w-full text-center text-lg md:text-2xl font-semibold border-none bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
        >
          <option value="">N/A</option>
          <option value="false">🍖 Meat</option>
          <option value="true">🌱 Vegetarian</option>
        </select>
      </div>
    </section>
  );
}
