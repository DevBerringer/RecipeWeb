import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';
import { useValidation } from '../contexts/ValidationContext';

export default function RecipeInstructions() {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const { getFieldError, clearFieldError } = useValidation();

  const handleStepChange = (idx: number, value: string) => {
    const newSteps = [...recipeDraft.steps];
    newSteps[idx] = value;
    setRecipeDraft({ ...recipeDraft, steps: newSteps });
    
    // Clear validation error when user starts typing
    if (value.trim().length > 0) {
      clearFieldError('steps');
    }
  };

  const handleAddStep = () => {
    setRecipeDraft({ 
      ...recipeDraft, 
      steps: [...recipeDraft.steps, ''] 
    });
  };

  const handleRemoveStep = (idx: number) => {
    const newSteps = recipeDraft.steps.filter((_, i) => i !== idx);
    setRecipeDraft({ ...recipeDraft, steps: newSteps });
    
    // Validate steps after removal
    const validSteps = newSteps.filter(step => step.trim().length > 0);
    if (validSteps.length > 0) {
      clearFieldError('steps');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-['Mynerve'] text-2xl md:text-3xl font-semibold text-gray-800">
        👩‍🍳 Instructions
      </h2>
      <div className="space-y-4">
        {recipeDraft.steps
          .map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <textarea
                value={step}
                onChange={(e) => handleStepChange(idx, e.target.value)}
                className="handWritten flex-1 rounded-lg border border-recipecentral bg-amber-50 px-3 py-2 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                rows={2}
                placeholder="Enter instruction step..."
              />
              <button
                type="button"
                onClick={() => handleRemoveStep(idx)}
                className="text-red-500 hover:text-red-700 mt-1"
              >
                ✕
              </button>
            </div>
          ))}
        <button
          type="button"
          onClick={handleAddStep}
          className="handWritten rounded-lg border-2 border-dashed border-recipecentral bg-amber-50 px-4 py-2 text-lg hover:bg-amber-100 transition-colors"
        >
          + Add Step
        </button>
        {getFieldError('steps') && (
          <p className="text-sm text-red-600 mt-2">{getFieldError('steps')}</p>
        )}
      </div>
    </div>
  );
}
